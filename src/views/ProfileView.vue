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
        <input type="checkbox" id="flexFilters" v-model="flexFilters" />
        <b-form-label for="flexFilters">
          {{ $t('activate_flex_filters') }}
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
      flexFilters: window.localStorage.getItem('flexFilters') || false,
    }
  },
  watch: {
    flexFilters() {
      window.localStorage.removeItem('flexFilters')
      if (this.flexFilters) {
        window.localStorage.setItem('flexFilters', true)
      }
      this.$store.dispatch('search/reset')
    },
  },
}
</script>
