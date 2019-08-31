<template>
  <section class="container container_m">
    <h2>{{ $t('dark_mode') }}</h2>
    <p>{{ $t('dark_mode_explanation') }}</p>
    <button
      class="btn btn_outline"
      @click="toggleDarkMode"
      v-if="!isDarkModeActive"
    >
      {{ $t('activate_dark_mode') }}
    </button>
    <button
      class="btn btn_outline"
      @click="toggleDarkMode"
      v-if="isDarkModeActive"
    >
      {{ $t('deactivate_dark_mode') }}
    </button>
  </section>
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
