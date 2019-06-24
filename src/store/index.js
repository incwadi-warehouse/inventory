import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/books'
import genres from './modules/genres'
import branches from './modules/branches'
import filter from './modules/filter'
import customer from './modules/customer'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books: books,
    genres: genres,
    branches: branches,
    filter: filter,
    customer: customer,
    user: user
  },
  state: {
    isLoading: false,
    tab: null
  },
  mutations: {
    isLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    tab (state, tab) {
      state.tab = tab
    }
  }
})
