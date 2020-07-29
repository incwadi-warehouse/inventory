<template>
  <b-app>
    <heading class="noprint" />
    <navigation class="noprint" />
    <b-content>
      <router-view v-if="isAuthenticated" />
      <login v-if="!isAuthenticated" />
    </b-content>
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
  </b-app>
</template>

<script>
import Heading from './components/Heading'
import Login from './components/Login'
import Navigation from './components/Navigation'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Heading,
    Login,
    Navigation,
  },
  data() {
    return {
      notifications: this.$notify.list(),
    }
  },
  computed: {
    ...mapState('user', ['isAuthenticated']),
  },
  mounted: function () {
    const el = document.querySelector('html')
    el.style.setProperty(
      '--color-primary-10',
      process.env.COLOR10 !== 'false' ? process.env.COLOR10 : '#e1661e'
    )
    el.style.setProperty(
      '--color-primary-05',
      process.env.COLOR05 !== 'false' ? process.env.COLOR05 : '#eeab84'
    )
    el.style.setProperty(
      '--color-primary-00',
      process.env.COLOR00 !== 'false' ? process.env.COLOR00 : '#fcf1ea'
    )
    this.$store.dispatch('user/check')
  },
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
