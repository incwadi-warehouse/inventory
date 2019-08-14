<template>
  <div id="app">
    <heading/>
    <navigation/>
    <main class="content" role="main">
      <notice class="noprint" v-if="isAuthenticated"/>
      <router-view v-if="isAuthenticated"/>
      <login v-if="!isAuthenticated"/>
    </main>
  </div>
</template>

<script>
import Heading from './components/Heading'
import Login from './components/Login'
import Notice from './components/Notice'
import Navigation from './components/Navigation'
import Cookies from 'js-cookie'

export default {
  name: 'app',
  components: {
    Heading,
    Login,
    Notice,
    Navigation
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.user.isAuthenticated
    }
  },
  mounted: function () {
    document.documentElement.style.setProperty(
      '--color-primary',
      process.env.BRAND_COLOR
    )

    if (Cookies.get('token') !== undefined) {
      this.$store.commit('user/isAuthenticated', true)
    }
  }
}
</script>

<style src="../node_modules/baldeweg_ui/dist/style.min.css"></style>

<style>
@media print {
  .header {
    height: 0;
  }
  .content {
    margin-top: 0;
  }
}
</style>
