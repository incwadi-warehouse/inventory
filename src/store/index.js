import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Books
    books: [],
    book: {
      title: null,
      author: null,
      genre: null,
      added: null,
      price: null,
      stocked: null
    },
    // Genres
    genres: [],
    genre: null,
    // Branches
    branches: null,
    // User
    me: null,
    // Filter
    searchTerm: null,
    offset: 0,
    limit: 20,
    stocked: null,
    added: null,
    branch: null,
    genreFilter: null,
    lending: null,
    sort: null,
    // Spinner
    isLoading: false
  },
  mutations,
  actions
})
