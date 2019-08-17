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
    },
    remove (state, notification) {
      const id = state.notifications.indexOf(notification)
      state.notifications.splice(id, 1)
    }
  },
  actions: {
    add (context, data) {
      const notification = {
        id: new Date().getTime(),
        msg: data.msg,
        state: data.state || 'neutral'
      }
      context.commit('add', notification)
      setTimeout(() => {
        context.commit('remove', notification)
      }, 5000)
    }
  }
}
