import api from '../../api'

export default {
  namespaced: true,
  state: {
    genres: [],
    genre: null,
    name: ''
  },
  mutations: {
    genres (state, genres) {
      state.genre = genres
    },
    genre (state, genre) {
      state.genre = genre
    },
    name (state, name) {
      state.name = name
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
    createGenre (context) {
      api(context.rootState.user.token)
        .post('/v1/genre/new', {
          name: context.state.name
        })
        .then(function (response) {
          context.commit('name', '')
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
