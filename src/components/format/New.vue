<template>
  <b-form @submit.prevent="createFormat">
    <b-form-group>
      <b-form-item>
        <b-form-label for="format" hidden>
          {{ $t('new_format') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="text"
          id="format"
          :placeholder="$t('enter_format_and_hit_enter')"
          v-model="state.format"
        />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { create } from '@/api/format'

export default {
  name: 'format-new',
  setup(props, { emit }) {
    const state = reactive({
      format: null,
    })

    const createFormat = () => {
      create({ name: state.format }).then(() => {
        emit('created')
        state.format = null
      })
    }

    return { state, createFormat }
  },
}
</script>
