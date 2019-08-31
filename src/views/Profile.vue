<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('profile') }}</h1>
    </section>
    <password />
    <dark-mode />
  </section>
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
