import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/books'
import genres from './modules/genres'
import branches from './modules/branches'
import filter from './modules/filter'
import api from '../api'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books: books,
    genres: genres,
    branches: branches,
    filter: filter
  },
  state: {
    me: null,
    isLoading: false,
    showFilters: false,
    showCreate: false,
    token: Cookies.get('token'),
    customers: null
  },
  mutations: {
    me (state, me) {
      state.me = me
    },
    isLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    showFilters (state, showFilters) {
      state.showFilters = showFilters
    },
    showCreate (state, showCreate) {
      state.showCreate = showCreate
    },
    token (state, token) {
      state.token = token
    },
    customers (state, customers) {
      state.customers = customers
    }
  },
  actions: {
    login (context, data) {
      api(context.state.token)
        .post('/api/login_check', {
          username: data.user,
          password: data.password
        })
        .then(function (response) {
          context.commit('token', response.data.token)
          Cookies.set('token', response.data.token, { expires: 1 })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    me (context) {
      api(context.state.token)
        .get('/v1/me')
        .then(function (response) {
          context.commit('me', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    customers (context) {
      api(context.state.token)
        .get('/v1/customer/')
        .then(function (response) {
          context.commit('customers', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toggleFilters (context) {
      context.commit('showFilters', !context.state.showFilters)
    },
    toggleShowCreate (context) {
      context.commit('showCreate', !context.state.showCreate)
    }
  }
})
