<template>
  <b-container size="m">
    <h2>{{ $t('dark_mode') }}</h2>
    <p>{{ $t('dark_mode_explanation') }}</p>
    <b-button type="outline" @click="toggleDarkMode" v-if="!isDarkModeActive">
      {{ $t('activate_dark_mode') }}
    </b-button>
    <b-button type="outline" @click="toggleDarkMode" v-if="isDarkModeActive">
      {{ $t('deactivate_dark_mode') }}
    </b-button>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'dark-mode',
  computed: {
    ...mapState('darkMode', ['isDarkModeActive'])
  },
  methods: {
    ...mapActions('darkMode', ['toggleDarkMode'])
  }
}
</script>
