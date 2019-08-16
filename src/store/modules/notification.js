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
    add (context, data) {
      context.commit('add', {
        id: new Date().getTime(),
        msg: data.msg,
        state: data.state || 'neutral'
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
