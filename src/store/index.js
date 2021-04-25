import Vue from 'vue'
import Vuex from 'vuex'
import book from './book'
import genre from './genre'
import branch from './branch'
import staff from './staff'
import stats from './stats'
import author from './author'
import search from './search'
import condition from './condition'
import tag from './tag'
import savedsearch from './savedsearch'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showOffCanvas: false,
  },
  mutations: {
    showOffCanvas(state, status) {
      state.showOffCanvas = status
    },
  },
  actions: {},
  modules: {
    book,
    genre,
    branch,
    staff,
    stats,
    author,
    search,
    condition,
    tag,
    savedsearch,
  },
})
