import api from '../../api'
import notification from '../../util/notification'

export default {
  namespaced: true,
  state: {
    genres: [],
    genre: null,
    name: null,
    isProcessing: false
  },
  mutations: {
    genres(state, genres) {
      state.genres = genres
    },
    genre(state, genre) {
      state.genre = genre
    },
    name(state, name) {
      state.name = name
    },
    isProcessing(state, status) {
      state.isProcessing = status
    }
  },
  actions: {
    genres(context) {
      api(context.rootState.user.token)
        .get('/v1/genre/')
        .then(function(response) {
          context.commit('genres', response.data.genres)
        })
    },
    create(context) {
      context.commit('isProcessing', true)
      api(context.rootState.user.token)
        .post('/v1/genre/new', {
          name: context.state.name
        })
        .then(function() {
          context.commit('name', null)
          context.dispatch('genres')
          notification('genre_create_success', 'success')
        })
        .catch(function() {
          notification('genre_create_error', 'error')
        })
        .finally(function() {
          context.commit('isProcessing', false)
        })
    },
    remove(context, id) {
      api(context.rootState.user.token)
        .delete('/v1/genre/' + id)
        .then(function() {
          context.dispatch('genres')
          notification('genre_remove_success', 'success')
        })
        .catch(function() {
          notification('genre_remove_error', 'error')
        })
    }
  }
}
