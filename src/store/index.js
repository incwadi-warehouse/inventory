import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import genre from './modules/genre'
import branch from './modules/branch'
import filter from './modules/filter'
import staff from './modules/staff'
import user from './modules/user'
import notification from './modules/notification'
import navigation from './modules/navigation'
import stats from './modules/stats'
import author from './modules/author'
import search from './modules/search'
import darkMode from './modules/darkMode'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    book,
    genre,
    branch,
    filter,
    staff,
    user,
    notification,
    navigation,
    stats,
    author,
    search,
    darkMode
  }
})
