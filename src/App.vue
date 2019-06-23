<template>
  <div id="app">
    <heading/>
    <main class="content" role="main">
      <router-view v-if="isAuthenticated"/>
      <login v-if="!isAuthenticated"/>
    </main>
  </div>
</template>

<script>
import Heading from './components/Heading'
import Login from './components/Login'
import Cookies from 'js-cookie'

export default {
  name: 'app',
  components: {
    Heading,
    Login
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.isAuthenticated
    }
  },
  mounted: function () {
    document.documentElement.style.setProperty(
      '--color-brand',
      process.env.BRAND_COLOR
    )

    if (Cookies.get('token') !== undefined) {
      this.$store.commit('isAuthenticated', true)
    }
  }
}
</script>

<style src="../node_modules/baldeweg_ui/dist/style.min.css"></style>
