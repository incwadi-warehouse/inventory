import api from '../../api'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    authors: null,
    firstname: null,
    surname: null
  },
  mutations: {
    authors (state, authors) {
      state.authors = authors
    },
    removeAuthor (state, id) {
      const authors = state.authors.filter(author => author.id === id)
      authors.forEach((author) => {
        const id = state.authors.indexOf(author)
        state.authors.splice(id, 1)
      })
    },
    firstname (state, firstname) {
      state.firstname = firstname
    },
    surname (state, surname) {
      state.surname = surname
    }
  },
  actions: {
    authors (context) {
      if (!context.rootState.filter.searchTerm) return

      api(context.rootState.user.token)
        .get('/v1/author/find', {
          params: {
            term: context.rootState.filter.searchTerm
          }
        })
        .then(function (response) {
          context.commit('authors', response.data.authors)
        })
    },
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
          router.push({ name: 'book' })
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
          context.commit('removeAuthor', id)
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
