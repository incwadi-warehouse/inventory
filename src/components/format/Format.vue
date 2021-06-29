<template>
  <div v-if="state.formats">
    <b-list v-for="format in state.formats" :key="format.id">
      <template #title>
        <format-title :format="format" />
      </template>

      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="more" />
          </template>
          <b-dropdown-item icon="bin" @click="removeFormat(format.id)">
            {{ $t('remove') }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-list>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
import { list, remove } from '@/api/format'
import FormatTitle from '@/components/format/Title'

export default {
  name: 'format-list',
  components: {
    FormatTitle,
  },
  setup() {
    const state = reactive({
      formats: null,
      edit: false,
    })

    const listFormats = () => {
      list().then((response) => {
        state.formats = response.data
      })
    }

    const removeFormat = (id) => {
      remove(id).then(listFormats)
    }

    onMounted(listFormats)

    return { state, listFormats, removeFormat }
  },
}
</script>
