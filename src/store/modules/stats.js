import api from '../../api'

export default {
  namespaced: true,
  state: {
    stats: null
  },
  mutations: {
    stats(state, stats) {
      state.stats = stats
    }
  },
  actions: {
    stats(context) {
      api(context.rootState.user.token)
        .get('/v1/stats/')
        .then(function(response) {
          context.commit('stats', response.data)
        })
    }
  }
}
