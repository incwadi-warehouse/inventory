export default {
  namespaced: true,
  state: {
    showOffCanvas: false,
  },
  mutations: {
    showOffCanvas(state, status) {
      state.showOffCanvas = status
    },
  },
}
