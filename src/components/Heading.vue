<template>
  <header class="masthead noprint">
    <div class="masthead_nav" v-if="isAuthenticated">
      <button class="masthead_btn" @click="showOffCanvas(true)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 50 50"
          class="icon"
        >
          <g>
            <path d="M0 3h50v8.8H0zM0 38.2h50V47H0zM0 20.6h50v8.8H0z" />
          </g>
        </svg>
      </button>
    </div>
    <div class="masthead_logo">
      <router-link :to="{ name: 'index' }">
        <img :src="logo" alt="incwadi" loading="lazy" />
      </router-link>
    </div>
    <div class="masthead_settings" v-if="isAuthenticated">
      <button class="masthead_btn" @click="catalog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 50 50"
          class="icon"
        >
          <path
            d="M28.254 0v21.707h21.707v6.625H28.254v21.707h-6.547V28.332H0v-6.625h21.707V0z"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'heading',
  computed: {
    ...mapState('user', ['isAuthenticated']),
    logo: function() {
      return require('../../' + process.env.LOGO)
    }
  },
  methods: {
    ...mapMutations('navigation', ['showOffCanvas']),
    catalog: function() {
      this.$router.push({ name: 'create-book' })
    }
  }
}
</script>

<style>
.masthead_logo img {
  width: 110px;
}

@media all and (min-width: 410px) {
  .masthead_logo img {
    width: 200px;
  }
}
</style>
