export default {
  namespaced: true,
  state: {
    notifications: []
  },
  mutations: {
    notifications (state, notifications) {
      state.notifications = notifications
    },
    add (state, notification) {
      state.notifications.push(notification)
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
      context.commit('notifications', [])
    }
  }
}
