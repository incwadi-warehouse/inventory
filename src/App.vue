<template>
  <b-app>
    <heading class="noprint" />
    <navigation class="noprint" />
    <b-content>
      <b-notification-bar>
        <b-notification
          v-for="notification in notifications"
          :key="notification.id"
          :type="notification.state"
          hidable
        >
          {{ $t(notification.msg) }}
        </b-notification>
      </b-notification-bar>
      <router-view v-if="isAuthenticated" />
      <login v-if="!isAuthenticated" />
    </b-content>
  </b-app>
</template>

<script>
import Heading from './components/Heading'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Heading,
    Login,
    Navigation
  },
  data() {
    return {
      notifications: this.$notify.list()
    }
  },
  computed: {
    ...mapState('user', ['isAuthenticated'])
  },
  mounted: function() {
    document
      .querySelector('html')
      .style.setProperty('--color-primary-10', process.env.BRAND_COLOR)
    this.$store.dispatch('user/check')
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
