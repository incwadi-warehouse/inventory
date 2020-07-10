import Vue from 'vue'
import Vuex from 'vuex'
import book from './book'
import genre from './genre'
import branch from './branch'
import staff from './staff'
import user from './user'
import navigation from './navigation'
import stats from './stats'
import author from './author'
import search from './search'
import condition from './condition'
import report from './report'

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
