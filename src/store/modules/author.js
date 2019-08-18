import api from '../../api'
import router from '../../router'

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
          context.dispatch(
            'notification/add',
            {
              msg: 'author_edit_successful',
              state: 'success'
            },
            {
              root: true
            }
          )
        })
        .catch(function () {
          context.dispatch(
            'notification/add',
            {
              msg: 'author_edit_error',
              state: 'error'
            },
            {
              root: true
            }
          )
        })
    },
    remove (context, id) {
      api(context.rootState.user.token)
        .delete('/v1/author/' + id)
        .then(function () {
          context.dispatch(
            'notification/add',
            {
              msg: 'author_remove_successful',
              state: 'success'
            },
            {
              root: true
            }
          )
        })
        .catch(function (error) {
          console.error(error)
          context.dispatch(
            'notification/add',
            {
              msg: 'author_remove_error',
              state: 'error'
            },
            {
              root: true
            }
          )
        })
    }
  }
}
