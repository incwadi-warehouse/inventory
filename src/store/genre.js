import api from '../api'
import i18n from '../i18n'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    genres: [],
    genre: null,
    isProcessing: false,
  },
  mutations: {
    genres(state, genres) {
      state.genres = genres
    },
    genre(state, genre) {
      state.genre = genre
    },
    isProcessing(state, status) {
      state.isProcessing = status
    },
  },
  actions: {
    genres(context) {
      api()
        .get('/api/genre/')
        .then(function (response) {
          context.commit('genres', response.data)
        })
    },
    create(context, name) {
      context.commit('isProcessing', true)
      api()
        .post('/api/genre/new', {
          name: name,
        })
        .then(function () {
          context.dispatch('genres')
          notification.create(i18n.t('genre_create_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('genre_create_error'), 'error')
        })
        .finally(function () {
          context.commit('isProcessing', false)
        })
    },
    edit(context, data) {
      api()
        .put('/api/genre/' + data.id, {
          name: data.name,
        })
        .then(function () {
          context.dispatch('genres')
          notification.create(i18n.t('genre_edit_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('genre_edit_error'), 'error')
        })
    },
    remove(context, id) {
      api()
        .delete('/api/genre/' + id)
        .then(function () {
          context.dispatch('genres')
          notification.create(i18n.t('genre_remove_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('genre_remove_error'), 'error')
        })
    },
  },
}
