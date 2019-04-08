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
    isLoading: false,
    showCreate: false
  },
  mutations: {
    me (state, me) {
      state.me = me
    },
    isLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    showCreate (state, showCreate) {
      state.showCreate = showCreate
    }
  },
  actions: {
    login (context, data) {
      api
        .post('/api/login_check', {
          username: data.user,
          password: data.password
        })
        .then(function (response) {
          localStorage.setItem('token', response.data.token)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    me (context) {
      api
        .get('/v1/me')
        .then(function (response) {
          context.commit('me', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toggleShowCreate (context) {
      context.commit('showCreate', !context.state.showCreate)
    }
  }
})
