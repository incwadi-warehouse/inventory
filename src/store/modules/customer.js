import api from '../../api'

export default {
  namespaced: true,
  state: {
    customers: null
  },
  mutations: {
    customers (state, customers) {
      state.customers = customers
    }
  },
  actions: {
    customers (context) {
      api(context.state.token)
        .get('/v1/customer/')
        .then(function (response) {
          context.commit('customers', response.data.customers)
        })
    },
    createCustomer (context, name) {
      api(context.rootState.token)
        .post('/v1/customer/new', {
          name: name
        })
        .then(function (response) {
          context.dispatch('customers')
        })
    },
    removeCustomer (context, id) {
      api(context.rootState.token)
        .delete('/v1/customer/' + id)
        .then(function (response) {
          context.dispatch('customers')
        })
    }
  }
}
