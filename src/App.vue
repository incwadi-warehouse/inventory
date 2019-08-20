<template>
  <div id="app">
    <heading/>
    <navigation/>
    <main class="content" role="main">
      <notification class="noprint" v-if="isAuthenticated"/>
      <router-view v-if="isAuthenticated"/>
      <login v-if="!isAuthenticated"/>
    </main>
  </div>
</template>

<script>
import Heading from './components/Heading'
import Login from './components/Login'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Cookies from 'js-cookie'

export default {
  name: 'app',
  components: {
    Heading,
    Login,
    Notification,
    Navigation
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.user.isAuthenticated
    }
  },
  mounted: function () {
    document.documentElement.style.setProperty(
      '--color-primary-10',
      process.env.BRAND_COLOR
    )
    document.documentElement.style.setProperty(
      '--color-primary-05',
      '#eeab84'
    )
    document.documentElement.style.setProperty(
      '--color-primary-00',
      '#fcf1ea'
    )

    if (Cookies.get('token') !== undefined) {
      this.$store.commit('user/isAuthenticated', true)
    }
  }
}
</script>

<style src="../node_modules/baldeweg_ui/dist/style.min.css"></style>

<style>
input[type=search]::-ms-clear {
  display: none;
  width : 0;
  height: 0;
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
