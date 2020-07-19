import api from '../api'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    reports: null
  },
  mutations: {
    reports(state, reports) {
      state.reports = reports
    }
  },
  actions: {
    reports(context) {
      api(context.rootState.user.token)
        .get('/v1/report/')
        .then(function(response) {
          context.commit('reports', response.data)
        })
    },
    create(context, data) {
      api(context.rootState.user.token)
        .post('/v1/report/new', {
          name: data.name,
          searchTerm: data.searchTerm,
          limitTo: data.limitTo,
          sold: data.sold,
          removed: data.removed,
          olderThenXMonths: data.olderThenXMonths,
          branches: data.branches,
          genres: data.genres,
          lendMoreThenXMonths: data.lendMoreThenXMonths,
          orderBy: data.orderBy,
          releaseYear: data.releaseYear,
          type: data.type
        })
        .then(function() {
          context.dispatch('reports')
          notification.create('report_create_success', 'success')
        })
        .catch(function() {
          notification.create('report_create_error', 'error')
        })
    },
    remove(context, id) {
      api(context.rootState.user.token)
        .delete('/v1/report/' + id)
        .then(function() {
          context.dispatch('reports')
          notification.create('report_remove_success', 'success')
        })
        .catch(function() {
          notification.create('report_remove_error', 'error')
        })
    }
  }
}
