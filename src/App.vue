<template>
  <div id="app">
    <heading/>
    <main class="content" role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Heading from './components/Header'

export default {
  name: 'app',
  components: {
    Heading
  },
  mounted: function () {
    if (localStorage.getItem('user') === null || localStorage.getItem('pass') === null) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style src="../node_modules/baldeweg_ui/dist/style.min.css"></style>

<style>
:root {
  --color-brand: #e1661e;
}
</style>
