import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    isDarkModeActive: false
  },
  mutations: {
    isDarkModeActive(state, isDarkModeActive) {
      state.isDarkModeActive = isDarkModeActive
    }
  },
  actions: {
    toggleDarkMode(context) {
      if (document.documentElement.hasAttribute('dark')) {
        document.documentElement.removeAttribute('dark')
        context.commit('isDarkModeActive', false)
      } else {
        document.documentElement.setAttribute('dark', true)
        context.commit('isDarkModeActive', true)
      }
    }
  }
}
