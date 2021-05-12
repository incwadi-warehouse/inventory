import { onMounted, reactive } from '@vue/composition-api'
import {
  login as loginAction,
  refresh as refreshAction,
  changePassword as changePasswordAction,
  me as meAction,
} from '@/api/auth'
import Cookies from 'js-cookie'
import { notification } from '@baldeweg/components'
import i18n from '@/i18n'

export default function useAuth(emit) {
  const state = reactive({
    username: null,
    password: null,
    me: null,
    isAuthenticated: false,
    isLoggingIn: false,
    isChangingPassword: false,
    interval: null,
  })

  const session = () => {
    if (undefined !== Cookies.get('token')) {
      state.isAuthenticated = true
      getUser()
    }
    if (
      undefined === Cookies.get('token') &&
      undefined !== Cookies.get('refresh_token')
    ) {
      refresh()
    }
    if (
      undefined === Cookies.get('token') &&
      undefined === Cookies.get('refresh_token')
    ) {
      logout()
    }
  }

  const check = () => {
    session()
    state.interval = window.setInterval(() => {
      session()
    }, 30000)
  }

  const login = () => {
    state.isLoggingIn = true
    loginAction({
      username: state.username,
      password: state.password,
    })
      .then((response) => {
        Cookies.set('token', response.data.token, { expires: 7 })
        Cookies.set('refresh_token', response.data.refresh_token, {
          expires: 30,
        })
        state.isAuthenticated = true
        emit('loggedin')
        check()
        state.username = null
        state.password = null
      })
      .catch(() => {
        notification.create(i18n.t('wrong_credentials'), 'error')
      })
      .finally(() => {
        state.isLoggingIn = false
      })
  }

  const logout = () => {
    window.clearInterval(state.interval)
    Cookies.remove('token')
    Cookies.remove('refresh_token')
    state.isAuthenticated = false
    state.me = null
    emit('loggedout')
  }

  const refresh = () => {
    refreshAction()
      .then((response) => {
        Cookies.set('token', response.data.token, { expires: 7 })
        Cookies.set('refresh_token', response.data.refresh_token, {
          expires: 30,
        })
        state.isAuthenticated = true
      })
      .catch(() => {
        logout()
      })
  }

  const changePassword = () => {
    state.isChangingPassword = true
    changePasswordAction(state.password)
      .then(() => {
        notification.create(i18n.t('password_successful'), 'success')
        state.password = null
      })
      .catch(() => {
        notification.create(i18n.t('password_error'), 'error')
      })
      .finally(() => {
        state.isChangingPassword = false
      })
  }

  const getUser = () => {
    meAction()
      .then((response) => {
        state.me = response.data
      })
      .catch((e) => {
        if (e.response.status === 401) {
          logout()
        }
      })
  }

  onMounted(getUser)

  return {
    state,
    login,
    changePassword,
    refresh,
    getUser,
    logout,
    check,
    session,
  }
}
