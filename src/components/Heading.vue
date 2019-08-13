<template>
  <header class="masthead">
    <div class="masthead_nav" v-if="isAuthenticated">
      <ul class="nav">
        <li class="nav_item">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25.000001 25.000001" class="icon" @click="toggleMenu">
            <path d="M0 2h25v4H0zm0 16h25v4H0zm0-8h25v4H0z"/>
          </svg>
        </li>
      </ul>
    </div>
    <div class="masthead_logo">
      <router-link :to="{ name: 'book' }">
        <img :src=logo width="210" alt="incwadi" loading="lazy">
      </router-link>
    </div>
    <div class="masthead_settings">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" class="icon">
        <g>
          <path d="M20 4h10v10H20zM20 36h10v10H20zM20 20h10v10H20z"/>
        </g>
      </svg>
    </div>
  </header>
</template>

<script>
export default {
  name: 'heading',
  computed: {
    logo: function () {
      return require('../../' + process.env.LOGO)
    },
    isAuthenticated: function () {
      return this.$store.state.user.isAuthenticated
    }
  },
  methods: {
    toggleMenu: function () {
      this.$store.dispatch('navigation/toggleOffCanvas')
    }
  }
}
</script>
