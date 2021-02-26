<template>
  <b-app id="app">
    <heading class="noprint" />
    <navigation class="noprint" />
    <b-content>
      <router-view v-if="isAuthenticated" />
      <b-container size="s" v-if="!isAuthenticated">
        <h1>{{ $t('login') }}</h1>
        <profile-login />
      </b-container>
    </b-content>

    <b-notification-bar>
      <b-notification
        v-for="notification in notifications"
        :key="notification.id"
        :type="notification.state"
        :undo="notification.undo"
        hidable
      >
        {{ $t(notification.msg) }}
      </b-notification>
    </b-notification-bar>
    <b-tooltip />
  </b-app>
</template>

<script>
import Heading from './components/Heading'
import Navigation from './components/Navigation'
import ProfileLogin from './components/profile/Login'
import { mapState } from 'vuex'

export default {
  name: 'app',
  head: {
    title: 'Home',
    titleTemplate: '%s - incwadi',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'incwadi is a book database to manage your books.',
      },
      {
        vmid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
      {
        vmid: 'charset',
        charset: 'utf-8',
      },
    ],
  },
  components: {
    Heading,
    Navigation,
    ProfileLogin,
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
      process.env.VUE_APP_COLOR10 !== 'false'
        ? process.env.VUE_APP_COLOR10
        : '#d7621d'
    )
    el.style.setProperty(
      '--color-primary-05',
      process.env.VUE_APP_COLOR05 !== 'false'
        ? process.env.VUE_APP_COLOR05
        : '#e9915d'
    )
    el.style.setProperty(
      '--color-primary-00',
      process.env.VUE_APP_COLOR00 !== 'false'
        ? process.env.VUE_APP_COLOR00
        : '#f3c2a5'
    )
    this.$store.dispatch('user/check')
    this.$i18n.locale =
      window.localStorage.getItem('locale') || process.env.VUE_APP_LOCALE
  },
}
</script>

<style src="@baldeweg/components/dist/components.css" />

<style>
html {
  --color-primary-05: #e9915d;
  --color-primary-00: #f3c2a5;

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
