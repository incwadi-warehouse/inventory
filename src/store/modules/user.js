import api from '../../api'
import router from '../../router'
import Cookies from 'js-cookie'
import notification from '../../util/notification'

export default {
  namespaced: true,
  state: {
    token: Cookies.get('token'),
    username: null,
    password: null,
    me: null,
    isAuthenticated: false,
    isLoggingIn: false
  },
  getters: {
    isAdmin: (state) => {
      if (!state.me) return

      return state.me.roles.indexOf('ROLE_ADMIN') !== -1
    }
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
        })
        .catch(function () {
          notification('wrong_credentials', 'error')
        })
        .finally(function () {
          context.commit('isLoggingIn', false)
        })
    },
    logout (context) {
      context.commit('isAuthenticated', false)
      context.commit('username', null)
      context.commit('password', null)
      context.commit('me', null)
      context.commit('search/tab', null, { root: true })
      context.commit('search/books', [], { root: true })
      context.commit('search/counter', 0, { root: true })
      context.commit('filter/searchTerm', null, { root: true })
      context.dispatch('filter/reset', null, { root: true })
      context.commit('navigation/showOffCanvas', false, { root: true })
      Cookies.remove('token')
    },
    me (context) {
      api(context.state.token)
        .get('/v1/me')
        .then(function (response) {
          context.commit('me', response.data)
        })
    },
    password (context) {
      api(context.state.token)
        .put('/v1/password', {
          password: context.state.password
        })
        .then(function () {
          notification('password_successful', 'success')
          router.push({ name: 'index' })
          context.commit('password', null)
        })
        .catch(function () {
          notification('password_error', 'error')
        })
    }
  }
}
