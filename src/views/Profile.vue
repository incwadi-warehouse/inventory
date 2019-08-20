<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('profile') }}</h1>
    </section>
    <password/>
  </section>
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
