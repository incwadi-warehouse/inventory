import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import genre from './modules/genre'
import branch from './modules/branch'
import filter from './modules/filter'
import customer from './modules/customer'
import user from './modules/user'
import notice from './modules/notice'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    book,
    genre,
    branch,
    filter,
    customer,
    user,
    notice
  }
})
