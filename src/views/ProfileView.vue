<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('profile') }}</h1>
    </b-container>
    <b-container size="m">
      <profile-password />
    </b-container>
    <b-container size="m">
      <h2>{{ $t('themes') }}</h2>
      <b-theme />
    </b-container>
    <b-container size="m">
      <h2>{{ $t('language') }}</h2>
      <b-locale />
    </b-container>
    <b-container size="m">
      <h2>{{ $t('filters') }}</h2>
      <b-form-item>
        <input type="checkbox" id="classicFilters" v-model="classicFilters" />
        <b-form-label for="classicFilters">
          {{ $t('activate_classic_filters') }}
        </b-form-label>
      </b-form-item>
    </b-container>
  </article>
</template>

<script>
import ProfilePassword from '../components/profile/Password'

export default {
  name: 'profile-view',
  head: {
    title: 'Profile',
  },
  components: {
    ProfilePassword,
  },
  data() {
    return {
      classicFilters: window.localStorage.getItem('classicFilters') || false,
    }
  },
  watch: {
    classicFilters() {
      window.localStorage.removeItem('classicFilters')
      if (this.classicFilters) {
        window.localStorage.setItem('classicFilters', true)
      }
      this.$store.dispatch('search/reset')
    },
  },
}
</script>
