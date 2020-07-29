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
}
</script>
