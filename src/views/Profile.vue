<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('profile') }}</h1>
    </b-container>
    <password />
    <dark-mode />
  </article>
</template>

<script>
import Password from '../components/profile/Password'
import DarkMode from '../components/profile/DarkMode'

export default {
  name: 'profile-view',
  components: {
    Password,
    DarkMode
  }
}
</script>
