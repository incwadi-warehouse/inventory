import Vue from 'vue'
import Vuex from 'vuex'
import book from './book'
import genre from './genre'
import branch from './branch'
import staff from './staff'
import user from './user'
import app from './app'
import stats from './stats'
import author from './author'
import search from './search'
import condition from './condition'
import tag from './tag'
import savedsearch from './savedsearch'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    book,
    genre,
    branch,
    staff,
    user,
    app,
    stats,
    author,
    search,
    condition,
    tag,
    savedsearch,
  },
})
