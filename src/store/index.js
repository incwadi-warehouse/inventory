import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import genre from './modules/genre'
import branch from './modules/branch'
import staff from './modules/staff'
import user from './modules/user'
import navigation from './modules/navigation'
import stats from './modules/stats'
import author from './modules/author'
import search from './modules/search'
import condition from './modules/condition'
import report from './modules/report'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    book,
    genre,
    branch,
    staff,
    user,
    navigation,
    stats,
    author,
    search,
    condition,
    report
  }
})
