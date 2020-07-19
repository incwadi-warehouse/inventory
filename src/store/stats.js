import api from '../api'

export default {
  namespaced: true,
  state: {
    stats: null,
    isLoading: true,
  },
  mutations: {
    stats(state, stats) {
      state.stats = stats
    },
    isLoading(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    stats(context) {
      context.commit('isLoading', true)
      api(context.rootState.user.token)
        .get('/v1/stats/')
        .then(function (response) {
          context.commit('stats', response.data)
        })
        .finally(function () {
          context.commit('isLoading', false)
        })
    },
  },
}
