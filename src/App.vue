<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted: function () {
    if (localStorage.getItem('user') === null || localStorage.getItem('pass') === null) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style src="../node_modules/baldeweg_ui/dist/style.min.css"></style>
