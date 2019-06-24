import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/books'
import genres from './modules/genres'
import branches from './modules/branches'
import filter from './modules/filter'
import customer from './modules/customer'
import api from '../api'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books: books,
    genres: genres,
    branches: branches,
    filter: filter,
    customer: customer
  },
  state: {
    me: null,
    isLoading: false,
    token: Cookies.get('token'),
    isAuthenticated: false,
    isLoggingIn: false,
    hasLoginError: false,
    tab: null
  },
  mutations: {
    me (state, me) {
      state.me = me
    },
    isLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    token (state, token) {
      state.token = token
    },
    isAuthenticated (state, status) {
      state.isAuthenticated = status
    },
    isLoggingIn (state, status) {
      state.isLoggingIn = status
    },
    hasLoginError (state, status) {
      state.hasLoginError = status
    },
    tab (state, tab) {
      state.tab = tab
    }
  },
  actions: {
    login (context, data) {
      context.commit('isLoggingIn', true)
      api(context.state.token)
        .post('/api/login_check', {
          username: data.user,
          password: data.password
        })
        .then(function (response) {
          context.commit('token', response.data.token)
          Cookies.set('token', response.data.token, { expires: 7 })
          context.commit('isAuthenticated', true)
          context.commit('hasLoginError', false)
        })
        .catch(function (error) {
          console.log(error)
          context.commit('hasLoginError', true)
        })
        .finally(function () {
          context.commit('isLoggingIn', false)
        })
    },
    me (context) {
      api(context.state.token)
        .get('/v1/me')
        .then(function (response) {
          context.commit('me', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
})
