<template>
  <b-container size="m">
    <h2>{{ $t('file_manager') }} (Experiment)</h2>

    <b-spinner size="m" v-if="directory.state.isLoading" />

    <ul>
      <li v-for="(element, index) in directory.state.elements" :key="index">
        <span
          v-if="element.isDir"
          @click="directory.state.dir = element.name"
          >{{ element.name }}</span
        >
        <span v-else>{{ element.name }}</span>
        <span v-if="element.isFile"> ({{ element.size }} bytes)</span>
      </li>
    </ul>
  </b-container>
</template>

<script>
import useDirectory from '@/composables/useDirectory'

export default {
  name: 'directory-file-manager',
  setup() {
    const directory = useDirectory()

    return { directory }
  },
}
</script>
