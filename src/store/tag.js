import api from '../api'
import i18n from '../i18n'
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
      api()
        .post('/api/tag/new', {
          name: name,
        })
        .then(function (response) {
          context.commit('tag', response.data)
          context.commit('addTag', response.data)
        })
        .catch(function () {
          notification.create(i18n.t('create_tag_not_successful'), 'error')
        })
    },
    remove(context, tag) {
      api()
        .delete('/api/tag/' + tag.id)
        .then(function () {
          context.commit('removeTag', tag)
        })
        .catch(function () {
          notification.create(i18n.t('remove_tag_error'), 'error')
        })
    },
  },
}
