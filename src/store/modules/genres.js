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
      api
        .get('/genre/')
        .then(function (response) {
          context.commit('genres', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createGenre (context, name) {
      api
        .post('/genre/new', {
          name: name
        })
        .then(function (response) {
          context.dispatch('genres')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
