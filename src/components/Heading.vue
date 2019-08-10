<template>
  <header class="masthead">
    <div class="masthead_logo">
      <router-link :to="{ name: 'book' }">
        <img :src=logo width="210" alt="incwadi" loading="lazy">
      </router-link>
    </div>
    <div class="masthead_nav">
      <navigation/>
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
