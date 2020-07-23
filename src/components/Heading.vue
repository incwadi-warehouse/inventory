<template>
  <b-masthead
    @toggle-menu="showOffCanvas(true)"
    @toggle-settings="settings"
    :showMenu="isAuthenticated"
    :showSettings="isAuthenticated"
  >
    <router-link :to="{ name: 'search' }">
      <logo v-if="hasLogo" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 200 200"
        class="logo"
        v-else
      >
        <path
          d="M 0 0 L 0 200 L 50 170 L 100 140 L 150 170 L 200 200 L 200 0 L 0 0 z "
        />
      </svg>
    </router-link>
  </b-masthead>
</template>

<script>
import Logo from './Logo'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'heading',
  components: {
    Logo,
  },
  computed: {
    ...mapState('user', ['isAuthenticated']),
    hasLogo: function () {
      return process.env.LOGO === 'false' ? false : true
    },
  },
  methods: {
    ...mapMutations('app', ['showOffCanvas']),
    settings: function () {
      if (this.$route.name === 'profile') return

      this.$router.push({ name: 'profile' })
    },
  },
}
</script>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
</style>
