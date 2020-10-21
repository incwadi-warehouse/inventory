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
    removeTag(state, tag) {
      const id = state.tags.indexOf(tag)
      state.tags.splice(id, 1)
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
    remove(context, tag) {
      api(context.rootState.user.token)
        .delete('/api/v1/tag/' + tag.id)
        .then(function () {
          context.commit('removeTag', tag)
        })
        .catch(function () {
          notification.create('remove_tag_error', 'error')
        })
    },
  },
}
