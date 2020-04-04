import store from '../../store'

export default function(msg, state, timer, undo) {
  const notification = {
    id: new Date().getTime(),
    msg: msg,
    state: state || 'neutral',
    timer: timer || 5000,
    undo: undo
  }
  store.commit('notification/add', notification)
  setTimeout(() => {
    store.commit('notification/remove', notification)
  }, notification.timer)
}
