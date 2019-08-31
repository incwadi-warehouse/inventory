export default {
  namespaced: true,
  state: {
    notifications: []
  },
  mutations: {
    notifications(state, notifications) {
      state.notifications = notifications
    },
    add(state, notification) {
      state.notifications.push(notification)
    },
    remove(state, notification) {
      const id = state.notifications.indexOf(notification)
      state.notifications.splice(id, 1)
    }
  }
}
