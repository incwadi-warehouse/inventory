<template>
  <div class="offcanvas">
    <div :class="{offcanvas_overlay: true, isActive: showOffCanvas}" @click="closeOffCanvas"></div>
    <div :class="{offcanvas_container: true, isActive: showOffCanvas}" v-if="isAuthenticated">
      <div class="offcanvas_header">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" class="icon" @click="closeOffCanvas">
          <path
            d="M44.987 9.643l-15.35 15.349 15.35 15.35-4.685 4.684-15.349-15.35-15.35 15.35-4.629-4.63 15.35-15.349-15.35-15.35L9.66 5.014l15.35 15.35 15.348-15.35z" />
        </svg>
      </div>
      <ul class="offcanvas_nav">
        <li class="offcanvas_item">
          <router-link :to="{ name: 'book' }">
            {{ $t('search') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'genre' }">
            {{ $t('genres') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'customer' }">
            {{ $t('customers') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'stats' }">
            {{ $t('stats') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'about' }">
            {{ $t('about') }}
          </router-link>
        </li>
      </ul>
      <hr>
      <ul class="offcanvas_nav">
        <li class="offcanvas_item">
          <a href="/logout" @click.prevent="logout">
            {{ $t('logout') }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  computed: {
    isAuthenticated: function () {
      return this.$store.state.user.isAuthenticated
    },
    showOffCanvas: function () {
      return this.$store.state.navigation.showOffCanvas
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('user/logout')
    },
    closeOffCanvas: function () {
      this.$store.commit('navigation/showOffCanvas', false)
    }
  }
}
</script>
