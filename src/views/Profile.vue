<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('profile') }}</h1>
    </section>
    <password/>
    <section class="container container_m">
      <button class="btn btn_outline" @click="toggleDarkMode">{{ $t('dark_mode') }}</button>
    </section>
  </section>
</template>

<script>
import Password from '../components/profile/Password'

export default {
  name: 'profile-view',
  components: {
    Password
  },
  methods: {
    toggleDarkMode: function () {
      if (document.documentElement.hasAttribute('dark')) {
        document.documentElement.removeAttribute('dark')
      } else {
        document.documentElement.setAttribute('dark', true)
      }
    }
  }
}
</script>
