import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    book: {
      title: null,
      author: null,
      genre: null,
      added: null,
      price: null,
      currency: null,
      stocked: null
    },
    searchTerm: null,
    offset: 0,
    genres: [],
    genre: null
  },
  mutations,
  actions
})
