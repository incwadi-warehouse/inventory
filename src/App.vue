<template>
  <div id="app">
    <heading />
    <navigation />
    <main class="content" role="main">
      <notification class="noprint" />
      <router-view v-if="isAuthenticated" />
      <login v-if="!isAuthenticated" />
    </main>
  </div>
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
    document
      .querySelector('html')
      .style.setProperty('--color-primary-05', '#eeab84')
    document
      .querySelector('html')
      .style.setProperty('--color-primary-00', '#fcf1ea')

    if (undefined !== Cookies.get('token')) {
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

<style src="../node_modules/baldeweg_ui/dist/style.min.css"></style>

<style>
input[type='search']::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: var(--color-neutral-06);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-neutral-08);
}
::-webkit-scrollbar-track-piece {
  background: var(--color-neutral-02);
}

@media print {
  .header {
    height: 0;
  }
  .content {
    margin-top: 0;
  }
}
</style>
