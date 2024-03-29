<template>
  <b-app id="app">
    <heading
      :isAuthenticated="state.isAuthenticated"
      @loggedout="onLoggedOut()"
    />
    <navigation
      :isAuthenticated="state.isAuthenticated"
      @loggedout="onLoggedOut()"
    />

    <b-content>
      <router-view v-if="state.isAuthenticated" />
      <b-container size="s" v-if="!state.isAuthenticated">
        <h1>{{ $t('login') }}</h1>
        <auth-login @loggedin="session" />
      </b-container>
    </b-content>

    <b-container size="m">
      <div v-html="about" />
    </b-container>

    <b-notification-bar :style="{ zIndex: '5' }">
      <b-notification
        v-for="notification in notifications"
        :key="notification.id"
        :type="notification.state"
        :undo="notification.undo"
        hidable
      >
        {{ notification.msg }}
      </b-notification>
    </b-notification-bar>
    <b-tooltip />
  </b-app>
</template>

<script>
import Heading from './components/Heading'
import Navigation from './components/Navigation'
import AuthLogin from './components/auth/Login'
import useAuth from '@/composables/useAuth'

export default {
  name: 'app',
  components: {
    Heading,
    Navigation,
    AuthLogin,
  },
  head: {
    title: 'Home',
    titleTemplate: '%s - incwadi',
  },
  data() {
    return {
      notifications: this.$notify.list(),
    }
  },
  setup(props, { emit }) {
    const { state, check, session } = useAuth(emit)
    check()

    return { state, session }
  },
  computed: {
    about() {
      return process.env.VUE_APP_ABOUT
    },
  },
  methods: {
    onLoggedOut() {
      this.$store.commit('showOffCanvas', false)
      this.session()
    },
  },
}
</script>

<style>
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
