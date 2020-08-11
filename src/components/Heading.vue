<template>
  <b-masthead
    @toggle-menu="showOffCanvas(true)"
    @toggle-settings="settings"
    :showMenu="isAuthenticated"
    :showSettings="isAuthenticated"
  >
    <router-link :to="{ name: 'index' }">
      <img :src="logo" alt="incwadi" />
    </router-link>
  </b-masthead>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'heading',
  computed: {
    ...mapState('user', ['isAuthenticated']),
    logo: function() {
      return require('../../' + process.env.LOGO)
    }
  },
  methods: {
    ...mapMutations('navigation', ['showOffCanvas']),
    settings: function() {
      if (this.$route.name === 'profile') return

      this.$router.push({ name: 'profile' })
    }
  }
}
</script>
