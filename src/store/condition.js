import api from '../api'
import i18n from '../i18n'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    conditions: null,
  },
  mutations: {
    conditions(state, conditions) {
      state.conditions = conditions
    },
  },
  actions: {
    list(context) {
      api()
        .get('/api/condition/')
        .then(function (response) {
          context.commit('conditions', response.data)
        })
    },
    create(context, condition) {
      api()
        .post('/api/condition/new', { name: condition })
        .then(function () {
          context.dispatch('list')
        })
        .catch(function () {
          notification.create(
            i18n.t('could_not_create_the_condition_try_again_later'),
            'error'
          )
        })
    },
    remove(context, conditionId) {
      api()
        .delete('/api/condition/' + conditionId)
        .then(function () {
          context.dispatch('list')
        })
        .catch(function () {
          notification.create(
            i18n.t('could_not_delete_the_condition_try_again_later'),
            'error'
          )
        })
    },
    update(context, data) {
      api()
        .put('/api/condition/' + data.id, { name: data.name })
        .then(function () {
          context.dispatch('list')
        })
        .catch(function () {
          notification.create(
            i18n.t('could_not_update_the_condition_try_again_later'),
            'error'
          )
        })
    },
  },
}
