import api from '../api'
import router from '../router'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    author: null,
  },
  mutations: {
    author(state, author) {
      state.author = author
    },
  },
  actions: {
    show(context, id) {
      api(context.rootState.user.token)
        .get('/api/v1/author/' + id)
        .then(function (response) {
          context.commit('author', response.data)
        })
    },
    edit(context, data) {
      api(context.rootState.user.token)
        .put('/api/v1/author/' + data.id, {
          firstname: data.firstname,
          surname: data.surname,
        })
        .then(function () {
          notification.create('author_edit_successful', 'success')
          router.push({ name: 'search' })
        })
        .catch(function () {
          notification.create('author_edit_error', 'error')
        })
    },
    remove(context, id) {
      api(context.rootState.user.token)
        .delete('/api/v1/author/' + id)
        .then(function () {
          notification.create('author_remove_successful', 'success')
        })
        .catch(function () {
          notification.create('author_remove_error', 'error')
        })
    },
  },
}
