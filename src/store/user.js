import Api from '../api'
import Cookies from 'js-cookie'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    token: Cookies.get('token'),
    refreshToken: Cookies.get('refresh_token'),
    me: null,
    isAuthenticated: false,
    isLoggingIn: false,
    isChangingPassword: false,
    interval: null,
  },
  mutations: {
    token(state, token) {
      state.token = token
    },
    refreshToken(state, refreshToken) {
      state.refreshToken = refreshToken
    },
    me(state, me) {
      state.me = me
    },
    isAuthenticated(state, status) {
      state.isAuthenticated = status
    },
    isLoggingIn(state, status) {
      state.isLoggingIn = status
    },
    isChangingPassword(state, status) {
      state.isChangingPassword = status
    },
    interval(state, interval) {
      state.interval = interval
    },
  },
  actions: {
    check(context) {
      context.dispatch('session')
      const _this = context
      context.commit(
        'interval',
        window.setInterval(function () {
          _this.dispatch('session')
        }, 5000)
      )
    },
    session(context) {
      if (undefined !== Cookies.get('token')) {
        context.commit('token', Cookies.get('token'))
        context.commit('isAuthenticated', true)
        context.dispatch('me')
      }
      if (
        undefined === Cookies.get('token') &&
        undefined !== Cookies.get('refresh_token')
      ) {
        context.dispatch('refresh')
      }
      if (
        undefined === Cookies.get('token') &&
        undefined === Cookies.get('refresh_token')
      ) {
        context.dispatch('logout')
      }
    },
    login(context, data) {
      context.commit('isLoggingIn', true)
      Api(context.state.token)
        .post('/api/login_check', {
          username: data.username,
          password: data.password,
        })
        .then(function (response) {
          Cookies.set('token', response.data.token, { expires: 7 })
          context.commit('token', response.data.token)
          Cookies.set('refresh_token', response.data.refresh_token, {
            expires: 30,
          })
          context.commit('refreshToken', response.data.refresh_token)
          context.commit('isAuthenticated', true)
          context.dispatch('check')
        })
        .catch(function () {
          notification.create('wrong_credentials', 'error')
        })
        .finally(function () {
          context.commit('isLoggingIn', false)
        })
    },
    refresh(context) {
      Api(context.state.token)
        .post('/api/token/refresh', {
          refresh_token: context.state.refreshToken,
        })
        .then(function (response) {
          Cookies.set('token', response.data.token, { expires: 7 })
          context.commit('token', response.data.token)
          Cookies.set('refresh_token', response.data.refresh_token, {
            expires: 30,
          })
          context.commit('refreshToken', response.data.refresh_token)
          context.commit('isAuthenticated', true)
        })
        .catch(function () {
          context.dispatch('logout')
        })
    },
    logout(context) {
      context.commit('isAuthenticated', false)
      context.commit('me', null)
      context.commit('app/showOffCanvas', false, { root: true })
      Cookies.remove('token')
      Cookies.remove('refresh_token')
      window.clearInterval(context.state.interval)
    },
    me(context) {
      Api(context.state.token)
        .get('/api/v1/me')
        .then(function (response) {
          context.commit('me', response.data)
        })
        .catch(function (e) {
          if (e.response.status === 401) {
            context.dispatch('logout')
            window.clearInterval(context.state.interval)
          }
        })
    },
    password(context, password) {
      context.commit('isChangingPassword', true)
      Api(context.state.token)
        .put('/api/v1/password', {
          password: password,
        })
        .then(function () {
          notification.create('password_successful', 'success')
        })
        .catch(function () {
          notification.create('password_error', 'error')
        })
        .finally(function () {
          context.commit('isChangingPassword', false)
        })
    },
  },
}
