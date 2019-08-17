import api from '../../api'

export default {
  namespaced: true,
  state: {
    customers: null,
    name: null,
    hasRemoveError: false,
    isProcessing: false
  },
  mutations: {
    customers (state, customers) {
      state.customers = customers
    },
    name (state, name) {
      state.name = name
    },
    hasRemoveError (state, status) {
      state.hasRemoveError = status
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
        })
        .catch(function () {
          context.commit('hasRemoveError', true)
        })
    }
  }
}
