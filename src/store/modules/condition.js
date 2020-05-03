import api from '../../api'
import notification from '../../util/notification'

export default {
  namespaced: true,
  state: {
    conditions: null
  },
  mutations: {
    conditions(state, conditions) {
      state.conditions = conditions
    }
  },
  actions: {
    list(context) {
      api(context.rootState.user.token)
        .get('/v1/condition/')
        .then(function(response) {
          context.commit('conditions', response.data)
        })
    },
    create(context, condition) {
      api(context.rootState.user.token)
        .post('/v1/condition/new', { name: condition })
        .then(function() {
          context.dispatch('list')
        })
        .catch(function() {
          notification(
            'could_not_create_the_condition_try_again_later',
            'error'
          )
        })
    },
    remove(context, condition) {
      api(context.rootState.user.token)
        .delete('/v1/condition/' + condition.id)
        .then(function() {
          context.dispatch('list')
        })
        .catch(function() {
          notification(
            'could_not_delete_the_condition_try_again_later',
            'error'
          )
        })
    },
    update(context, data) {
      api(context.rootState.user.token)
        .put('/v1/condition/' + data.id, { name: data.name })
        .then(function() {
          context.dispatch('list')
        })
        .catch(function() {
          notification(
            'could_not_update_the_condition_try_again_later',
            'error'
          )
        })
    }
  }
}
