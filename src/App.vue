<template>
  <div id="app">
    <heading/>
    <main class="content" role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Heading from './components/Heading'
import Cookies from 'js-cookie'

export default {
  name: 'app',
  components: {
    Heading
  },
  mounted: function () {
    document.documentElement.style.setProperty(
      '--color-brand',
      process.env.BRAND_COLOR
    )

    if (Cookies.get('token') === undefined) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style src="../node_modules/baldeweg_ui/dist/style.min.css"></style>
