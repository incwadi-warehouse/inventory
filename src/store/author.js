import api from '../api'
import router from '../router'
import i18n from '../i18n'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    authors: null,
    author: null,
  },
  mutations: {
    authors(state, authors) {
      state.authors = authors
    },
    removeAuthor(state, id) {
      const authors = state.authors.filter((author) => author.id === id)
      authors.forEach((author) => {
        const id = state.authors.indexOf(author)
        state.authors.splice(id, 1)
      })
    },
    author(state, author) {
      state.author = author
    },
  },
  actions: {
    authors(context) {
      if (!context.rootState.search.term) return

      api()
        .get('/api/v1/author/find', {
          params: {
            term: context.rootState.search.term,
          },
        })
        .then(function (response) {
          context.commit('authors', response.data)
        })
    },
    show(context, id) {
      api()
        .get('/api/v1/author/' + id)
        .then(function (response) {
          context.commit('author', response.data)
        })
    },
    edit(context, data) {
      api()
        .put('/api/v1/author/' + data.id, {
          firstname: data.firstname,
          surname: data.surname,
        })
        .then(function () {
          notification.create(i18n.t('author_edit_successful'), 'success')
          router.push({ name: 'search' })
        })
        .catch(function () {
          notification.create(i18n.t('author_edit_error'), 'error')
        })
    },
    remove(context, id) {
      context.commit('removeAuthor', id)
      api()
        .delete('/api/v1/author/' + id)
        .then(function () {
          notification.create(i18n.t('author_remove_successful'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('author_remove_error'), 'error')
        })
    },
  },
}
