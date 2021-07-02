<template>
  <article>
    <span @click="state.edit = true" v-if="!state.edit">
      {{ format.name }}
    </span>
    <b-form @submit.prevent="updateFormat" v-if="state.edit">
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
  </article>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import { edit } from '@/api/format'

export default {
  name: 'format-title',
  props: {
    format: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { name } = toRefs(props.format)
    const state = reactive({
      name: name,
      edit: false,
    })

    const updateFormat = () => {
      edit(props.format.id, { name: state.name }).then(() => {
        state.edit = false
      })
    }

    return { state, updateFormat }
  },
}
</script>
