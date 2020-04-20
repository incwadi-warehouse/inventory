import api from '../../api'

export default {
  namespaced: true,
  state: {
    stats: null,
    loading: true
  },
  mutations: {
    stats(state, stats) {
      state.stats = stats
    },
    loading(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    stats(context) {
      context.commit('loading', true)
      api(context.rootState.user.token)
        .get('/v1/stats/')
        .then(function(response) {
          context.commit('stats', response.data)
        })
        .finally(function() {
          context.commit('loading', false)
        })
    }
  }
}
