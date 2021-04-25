import api from '../api'
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
        .get('/api/v1/genre/')
        .then(function (response) {
          context.commit('genres', response.data)
        })
    },
    create(context, name) {
      context.commit('isProcessing', true)
      api()
        .post('/api/v1/genre/new', {
          name: name,
        })
        .then(function () {
          context.dispatch('genres')
          notification.create('genre_create_success', 'success')
        })
        .catch(function () {
          notification.create('genre_create_error', 'error')
        })
        .finally(function () {
          context.commit('isProcessing', false)
        })
    },
    edit(context, data) {
      api()
        .put('/api/v1/genre/' + data.id, {
          name: data.name,
        })
        .then(function () {
          context.dispatch('genres')
          notification.create('genre_edit_success', 'success')
        })
        .catch(function () {
          notification.create('genre_edit_error', 'error')
        })
    },
    remove(context, id) {
      api()
        .delete('/api/v1/genre/' + id)
        .then(function () {
          context.dispatch('genres')
          notification.create('genre_remove_success', 'success')
        })
        .catch(function () {
          notification.create('genre_remove_error', 'error')
        })
    },
  },
}
