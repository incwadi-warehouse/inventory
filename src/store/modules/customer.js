import api from '../../api'

export default {
  namespaced: true,
  state: {
    customers: null,
    hasRemoveError: false
  },
  mutations: {
    customers (state, customers) {
      state.customers = customers
    },
    hasRemoveError (state, status) {
      state.hasRemoveError = status
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
    createCustomer (context, name) {
      api(context.rootState.user.token)
        .post('/v1/customer/new', {
          name: name
        })
        .then(function () {
          context.dispatch('customers')
        })
    },
    removeCustomer (context, id) {
      api(context.rootState.user.token)
        .delete('/v1/customer/' + id)
        .then(function (response) {
          context.dispatch('customers')
        })
        .catch(function () {
          context.commit('hasRemoveError', true)
        })
    }
  }
}
