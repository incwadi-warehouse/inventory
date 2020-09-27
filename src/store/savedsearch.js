import api from '../api'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    savedsearches: null,
  },
  mutations: {
    savedsearches(state, savedsearches) {
      state.savedsearches = savedsearches
    },
  },
  actions: {
    savedsearches(context) {
      api(context.rootState.user.token)
        .get('/api/v1/savedsearch/')
        .then(function (response) {
          context.commit('savedsearches', response.data)
        })
    },
    create(context, data) {
      const filters = context.rootState.search.elements

      let flattenedFilters = []
      Object.keys(filters).forEach((key) => {
        if (!filters[key]) return
        if (
          !filters[key].field &&
          !filters[key].operator &&
          !filters[key].value
        )
          return flattenedFilters.push(filters[key])
      })

      let term = undefined
      if (context.rootState.search.term) {
        term = context.rootState.search.term
      }

      let filter = undefined
      if (flattenedFilters.length >= 1) {
        filter = flattenedFilters
      }

      let orderBy = undefined
      if (
        context.rootState.search.orderByField ||
        context.rootState.search.orderByDirection
      ) {
        orderBy = { book: [{}] }
        if (context.rootState.search.orderByField) {
          orderBy.book[0].field = context.rootState.search.orderByField
        }
        if (context.rootState.search.orderByDirection) {
          orderBy.book[0].direction = context.rootState.search.orderByDirection
        }
      }

      api(context.rootState.user.token)
        .post('/api/v1/savedsearch/new', {
          name: data.name,
          query: {
            term,
            filter,
            orderBy,
            limit: context.rootState.search.limit,
          },
        })
        .then(function () {
          context.dispatch('savedsearches')
          notification.create('savedsearches_create_success', 'success')
        })
        .catch(function () {
          notification.create('savedsearches_create_error', 'error')
        })
    },
    remove(context, id) {
      api(context.rootState.user.token)
        .delete('/api/v1/savedsearch/' + id)
        .then(function () {
          context.dispatch('savedsearches')
          notification.create('savedsearches_remove_success', 'success')
        })
        .catch(function () {
          notification.create('savedsearches_remove_error', 'error')
        })
    },
  },
}
