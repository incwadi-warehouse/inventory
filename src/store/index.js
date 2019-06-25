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
    books,
    genres,
    branches,
    filter,
    customer,
    user
  }
})
