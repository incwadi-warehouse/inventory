import api from '../api'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    tags: [],
    tag: null,
  },
  mutations: {
    tags(state, tags) {
      state.tags = tags
    },
    addTag(state, tag) {
      state.tags.push(tag)
    },
    tag(state, tag) {
      state.tag = tag
    },
  },
  actions: {
    create(context, name) {
      api(context.rootState.user.token)
        .post('/api/v1/tag/new', {
          name: name,
        })
        .then(function (response) {
          context.commit('tag', response.data)
          context.commit('addTag', response.data)
        })
        .catch(function () {
          notification.create('create_tag_not_successful', 'error')
        })
    },
  },
}
