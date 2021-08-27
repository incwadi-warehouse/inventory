<template>
  <b-form
    @submit.prevent="
      $emit('create-bookmark', { url: state.url })
      state.url = null
    "
  >
    <b-form-group>
      <b-form-item>
        <b-form-label for="url" hidden>
          {{ $t('newBookmark') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="text"
          id="url"
          :placeholder="$t('enter_bookmark_and_hit_enter')"
          v-model="state.url"
        />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  name: 'bookmark-create',
  setup() {
    const state = reactive({
      url: null,
    })

    return { state }
  },
}
</script>
