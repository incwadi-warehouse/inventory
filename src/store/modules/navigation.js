export default {
  namespaced: true,
  state: {
    showOffCanvas: false
  },
  mutations: {
    showOffCanvas (state, status) {
      state.showOffCanvas = status
    }
  },
  actions: {
    toggleOffCanvas (context) {
      context.commit('showOffCanvas', !context.state.showOffCanvas)
    }
  }
}
