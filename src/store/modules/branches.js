import api from '../../api'

export default {
  namespaced: true,
  state: {
    branches: null
  },
  mutations: {
    branches (state, branches) {
      state.branches = branches
    }
  },
  actions: {
    branches (context) {
      api
        .get('/v1/branch/')
        .then(function (response) {
          context.commit('branches', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
