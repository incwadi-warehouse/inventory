import api from '../../api'

export default {
  namespaced: true,
  state: {
    genres: [],
    genre: null
  },
  mutations: {
    genres (state, genres) {
      state.genres = genres
    },
    genre (state, genre) {
      state.genre = genre
    }
  },
  actions: {
    genres (context) {
      api(context.rootState.user.token)
        .get('/v1/genre/')
        .then(function (response) {
          context.commit('genres', response.data.genres)
        })
    },
    createGenre (context, name) {
      api(context.rootState.user.token)
        .post('/v1/genre/new', {
          name: name
        })
        .then(function (response) {
          context.dispatch('genres')
        })
    },
    removeGenre (context, id) {
      api(context.rootState.user.token)
        .delete('/v1/genre/' + id)
        .then(function (response) {
          context.dispatch('genres')
        })
    }
  }
}
