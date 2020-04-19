<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('profile') }}</h1>
    </b-container>
    <password />
    <b-container size="m">
      <h2>{{ $t('themes') }}</h2>
      <b-theme />
    </b-container>
  </article>
</template>

<script>
import Password from '../components/profile/Password'

export default {
  name: 'profile-view',
  components: {
    Password
  }
}
</script>
