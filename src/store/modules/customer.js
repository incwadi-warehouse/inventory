import api from '../../api'
import notification from '../../notification'

export default {
  namespaced: true,
  state: {
    customers: null,
    name: null,
    isProcessing: false
  },
  mutations: {
    customers (state, customers) {
      state.customers = customers
    },
    name (state, name) {
      state.name = name
    },
    isProcessing (state, status) {
      state.isProcessing = status
    }
  },
  actions: {
    customers (context) {
      api(context.rootState.user.token)
        .get('/v1/customer/')
        .then(function (response) {
          context.commit('customers', response.data.customers)
        })
    },
    create (context) {
      context.commit('isProcessing', true)
      api(context.rootState.user.token)
        .post('/v1/customer/new', {
          name: context.state.name
        })
        .then(function () {
          context.dispatch('customers')
          context.commit('name', null)
          notification('customer_create_success', 'success')
        })
        .catch(function () {
          notification('customer_create_error', 'error')
        })
        .finally(function () {
          context.commit('isProcessing', false)
        })
    },
    remove (context, id) {
      api(context.rootState.user.token)
        .delete('/v1/customer/' + id)
        .then(function () {
          context.dispatch('customers')
          notification('customer_remove_success', 'success')
        })
        .catch(function () {
          notification('customer_remove_error', 'error')
        })
    }
  }
}
