<template>
  <span @click="state.edit = true" v-if="!state.edit">
    {{ state.name }}
  </span>
  <b-form
    @submit.prevent="
      $emit('update-bookmark', {
        id: bookmark.id,
        bookmark: { name: state.name, url: bookmark.url },
      })
      state.edit = false
    "
    v-else
  >
    <b-form-group>
      <b-form-item>
        <b-form-label for="name" hidden>
          {{ $t('name') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="name" v-model="state.name" />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'

export default {
  name: 'bookmark-name',
  props: {
    bookmark: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { bookmark } = toRefs(props)
    const state = reactive({
      name: bookmark.value.name,
      edit: false,
    })

    return { state }
  },
}
</script>
