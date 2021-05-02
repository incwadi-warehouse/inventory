import api from '../api'
import i18n from '../i18n'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    staff: null,
    isProcessing: false,
  },
  mutations: {
    staff(state, staff) {
      state.staff = staff
    },
    isProcessing(state, status) {
      state.isProcessing = status
    },
  },
  actions: {
    staff(context) {
      api()
        .get('/api/v1/staff/')
        .then(function (response) {
          context.commit('staff', response.data)
        })
    },
    create(context, name) {
      context.commit('isProcessing', true)
      api()
        .post('/api/v1/staff/new', {
          name: name,
        })
        .then(function () {
          context.dispatch('staff')
          notification.create(i18n.t('staff_create_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('staff_create_error'), 'error')
        })
        .finally(function () {
          context.commit('isProcessing', false)
        })
    },
    edit(context, data) {
      api()
        .put('/api/v1/staff/' + data.id, {
          name: data.name,
        })
        .then(function () {
          context.dispatch('staff')
          notification.create(i18n.t('staff_edit_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('staff_edit_error'), 'error')
        })
    },
    remove(context, id) {
      api()
        .delete('/api/v1/staff/' + id)
        .then(function () {
          context.dispatch('staff')
          notification.create(i18n.t('staff_remove_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('staff_remove_error'), 'error')
        })
    },
  },
}
