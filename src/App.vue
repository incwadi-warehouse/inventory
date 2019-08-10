<template>
  <div id="app">
    <heading/>
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
import Cookies from 'js-cookie'

export default {
  name: 'app',
  components: {
    Heading,
    Login,
    Notice
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.user.isAuthenticated
    }
  },
  mounted: function () {
    document.documentElement.style.setProperty(
      '--color-brand',
      process.env.BRAND_COLOR
    )
    document.documentElement.style.setProperty(
      '--masthead-height',
      '66px'
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
