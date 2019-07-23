export default {
  namespaced: true,
  state: {
    notices: []
  },
  mutations: {
    notices (state, notices) {
      state.notices = notices
    },
    add (state, notice) {
      state.notices.push(notice)
    }
  },
  actions: {
    add (context, msg) {
      context.commit('add', {
        id: new Date().getTime(),
        msg: msg
      })
      setTimeout(() => {
        context.dispatch('reset')
      }, 5000)
    },
    reset (context) {
      context.commit('notices', [])
    }
  }
}
