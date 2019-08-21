import api from '../../api'
import router from '../../router'
import notification from '../../notification'

export default {
  namespaced: true,
  state: {
    firstname: null,
    surname: null
  },
  mutations: {
    firstname (state, firstname) {
      state.firstname = firstname
    },
    surname (state, surname) {
      state.surname = surname
    }
  },
  actions: {
    show (context, id) {
      api(context.rootState.user.token)
        .get('/v1/author/' + id)
        .then(function (response) {
          context.commit('firstname', response.data.firstname)
          context.commit('surname', response.data.surname)
        })
    },
    edit (context, id) {
      api(context.rootState.user.token)
        .put('/v1/author/' + id, {
          firstname: context.state.firstname,
          surname: context.state.surname
        })
        .then(function () {
          router.push({ name: 'index' })
          notification('author_edit_successful', 'success')
        })
        .catch(function () {
          notification('author_edit_error', 'error')
        })
    },
    remove (context, id) {
      api(context.rootState.user.token)
        .delete('/v1/author/' + id)
        .then(function () {
          notification('author_remove_successful', 'success')
        })
        .catch(function () {
          notification('author_remove_error', 'error')
        })
    }
  }
}
