<template>
  <b-app>
    <heading class="noprint" />
    <navigation class="noprint" />
    <b-content>
      <notification class="noprint" />
      <router-view v-if="isAuthenticated" />
      <login v-if="!isAuthenticated" />
    </b-content>
  </b-app>
</template>

<script>
import Heading from './components/Heading'
import Login from './components/Login'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Heading,
    Login,
    Notification,
    Navigation
  },
  computed: {
    ...mapState('user', ['isAuthenticated'])
  },
  mounted: function() {
    document
      .querySelector('html')
      .style.setProperty('--color-primary-10', process.env.BRAND_COLOR)

    if (undefined !== Cookies.get('token')) {
      this.$store.dispatch('user/me')
      this.$store.commit('user/isAuthenticated', true)
    }
    if (
      undefined === Cookies.get('token') &&
      undefined !== Cookies.get('refresh_token')
    ) {
      this.$store.dispatch('user/refresh')
    }
  }
}
</script>

<style>
html {
  --color-primary-05: #eeab84;
  --color-primary-00: #fcf1ea;

  --masthead-height: 66px;
}
@media print {
  html {
    --masthead-height: 0 !important;
  }
  .noprint {
    display: none !important;
  }
  .table {
    font-size: 0.7em;
  }
}
</style>
