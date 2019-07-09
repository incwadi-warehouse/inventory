import api from '../../api'
import Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    me: null,
    token: Cookies.get('token'),
    isAuthenticated: false,
    isLoggingIn: false,
    hasLoginError: false,
    username: null,
    password: null
  },
  mutations: {
    me (state, me) {
      state.me = me
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
    username (state, username) {
      state.username = username
    },
    password (state, password) {
      state.password = password
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
          context.commit('token', response.data.token)
          Cookies.set('token', response.data.token, { expires: 7 })
          context.commit('isAuthenticated', true)
          context.commit('hasLoginError', false)
          context.commit('username', null)
          context.commit('password', null)
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
    }
  }
}
