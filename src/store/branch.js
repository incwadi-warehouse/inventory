import api from '../api'
import i18n from '../i18n'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    branches: null,
    branch: null, // @deprecated
  },
  mutations: {
    branches(state, branches) {
      state.branches = branches
    },
    branch(state, branch) {
      state.branch = branch
    },
  },
  actions: {
    branches(context) {
      api()
        .get('/api/v1/branch/')
        .then(function (response) {
          context.commit('branches', response.data)
        })
    },
    // @deprecated
    branch(context) {
      api()
        .get('/api/v1/branch/my')
        .then(function (response) {
          context.commit('branch', response.data)
        })
    },
    update(context, data) {
      api()
        .put('/api/v1/branch/' + data.id, {
          name: data.name,
          steps: data.steps,
          currency: data.currency,
          ordering: data.ordering,
          orderBy: data.orderBy,
          public: data.public,
        })
        .then(function (response) {
          context.commit('branch', response.data)
          notification.create(i18n.t('branch_update_success'), 'success')
        })
        .catch(function (e) {
          notification.create(i18n.t('branch_update_error'), 'error')
          console.error(e)
        })
    },
  },
}
