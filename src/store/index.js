import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/books'
import genres from './modules/genres'
import branches from './modules/branches'
import filter from './modules/filter'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books: books,
    genres: genres,
    branches: branches,
    filter: filter
  },
  state: {
    me: null,
    isLoading: false
  },
  mutations: {
    me (state, me) {
      state.me = me
    },
    isLoading (state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    me (context) {
      api
        .get('/me')
        .then(function (response) {
          context.commit('me', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
})
