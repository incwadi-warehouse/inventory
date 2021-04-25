import api from '../api'
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
        .get('/api/v1/condition/')
        .then(function (response) {
          context.commit('conditions', response.data)
        })
    },
    create(context, condition) {
      api()
        .post('/api/v1/condition/new', { name: condition })
        .then(function () {
          context.dispatch('list')
        })
        .catch(function () {
          notification.create(
            'could_not_create_the_condition_try_again_later',
            'error'
          )
        })
    },
    remove(context, conditionId) {
      api()
        .delete('/api/v1/condition/' + conditionId)
        .then(function () {
          context.dispatch('list')
        })
        .catch(function () {
          notification.create(
            'could_not_delete_the_condition_try_again_later',
            'error'
          )
        })
    },
    update(context, data) {
      api()
        .put('/api/v1/condition/' + data.id, { name: data.name })
        .then(function () {
          context.dispatch('list')
        })
        .catch(function () {
          notification.create(
            'could_not_update_the_condition_try_again_later',
            'error'
          )
        })
    },
  },
}
