import api from '../../api'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    staff: null,
    isProcessing: false
  },
  mutations: {
    staff(state, staff) {
      state.staff = staff
    },
    isProcessing(state, status) {
      state.isProcessing = status
    }
  },
  actions: {
    staff(context) {
      api(context.rootState.user.token)
        .get('/v1/staff/')
        .then(function(response) {
          context.commit('staff', response.data)
        })
    },
    create(context, name) {
      context.commit('isProcessing', true)
      api(context.rootState.user.token)
        .post('/v1/staff/new', {
          name: name
        })
        .then(function() {
          context.dispatch('staff')
          notification.create('staff_create_success', 'success')
        })
        .catch(function() {
          notification.create('staff_create_error', 'error')
        })
        .finally(function() {
          context.commit('isProcessing', false)
        })
    },
    edit(context, data) {
      api(context.rootState.user.token)
        .put('/v1/staff/' + data.id, {
          name: data.name
        })
        .then(function() {
          context.dispatch('staff')
          notification.create('staff_edit_success', 'success')
        })
        .catch(function() {
          notification.create('staff_edit_error', 'error')
        })
    },
    remove(context, id) {
      api(context.rootState.user.token)
        .delete('/v1/staff/' + id)
        .then(function() {
          context.dispatch('staff')
          notification.create('staff_remove_success', 'success')
        })
        .catch(function() {
          notification.create('staff_remove_error', 'error')
        })
    }
  }
}
