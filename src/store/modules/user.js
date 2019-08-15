import api from '../../api'
import Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    token: Cookies.get('token'),
    username: null,
    password: null,
    me: null,
    isAuthenticated: false,
    isLoggingIn: false,
    hasLoginError: false
  },
  mutations: {
    token (state, token) {
      state.token = token
    },
    username (state, username) {
      state.username = username
    },
    password (state, password) {
      state.password = password
    },
    me (state, me) {
      state.me = me
    },
    isAuthenticated (state, status) {
      state.isAuthenticated = status
    },
    isLoggingIn (state, status) {
      state.isLoggingIn = status
    },
    hasLoginError (state, status) {
      state.hasLoginError = status
    }
  },
  actions: {
    login (context) {
      context.commit('isLoggingIn', true)
      api(context.state.token)
        .post('/api/login_check', {
          username: context.state.username,
          password: context.state.password
        })
        .then(function (response) {
          Cookies.set('token', response.data.token, { expires: 7 })
          context.commit('token', response.data.token)
          context.commit('username', null)
          context.commit('password', null)
          context.commit('isAuthenticated', true)
          context.commit('hasLoginError', false)
        })
        .catch(function () {
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
    }
  }
}
