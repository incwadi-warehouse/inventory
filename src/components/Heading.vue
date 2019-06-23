<template>
  <header class="header">
    <div class="header_left">
      <div class="header_item">
        <router-link :to="{ name: 'book' }">
          <img :src=logo alt="incwadi" loading="lazy">
        </router-link>
      </div>
    </div>
    <div class="header_right">
      <div class="header_item">
        <navigation/>
      </div>
    </div>
  </header>
</template>

<script>
import Navigation from './Navigation'

export default {
  name: 'heading',
  components: {
    Navigation
  },
  computed: {
    logo: function () {
      return require('../../' + process.env.LOGO)
    }
  }
}
</script>
