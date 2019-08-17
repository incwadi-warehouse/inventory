<template>
  <header class="masthead">
    <div class="masthead_nav" v-if="isAuthenticated">
      <ul class="nav">
        <li class="nav_item">
          <button class="btn btn_text" @click="openOffCanvas">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25.000001 25.000001" class="icon">
            <path d="M0 2h25v4H0zm0 16h25v4H0zm0-8h25v4H0z"/>
          </svg>
          </button>
        </li>
      </ul>
    </div>
    <div class="masthead_logo">
      <router-link :to="{ name: 'index' }">
        <img :src=logo width="210" alt="incwadi" loading="lazy">
      </router-link>
    </div>
    <div class="masthead_settings" v-if="isAuthenticated">
      <button class="btn btn_text" @click="logout">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" class="icon">
        <g>
          <path d="M20 4h10v10H20zM20 36h10v10H20zM20 20h10v10H20z"/>
        </g>
      </svg>
      </button>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'heading',
  computed: {
    ...mapState('user', [
      'isAuthenticated'
    ]),
    logo: function () {
      return require('../../' + process.env.LOGO)
    }
  },
  methods: {
    openOffCanvas: function () {
      this.$store.commit('navigation/showOffCanvas', true)
    },
    logout: function () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
