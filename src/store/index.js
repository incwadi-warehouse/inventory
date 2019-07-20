import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import genre from './modules/genre'
import branch from './modules/branch'
import filter from './modules/filter'
import customer from './modules/customer'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    genre,
    branch,
    filter,
    customer,
    user
  }
})
