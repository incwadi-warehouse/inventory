<template>
  <section>
    <div :class="{offcanvas_overlay: true, isActive: showOffCanvas}" @click="toggleCanvas"></div>
    <div :class="{offcanvas: true, isActive: showOffCanvas}" v-if="isAuthenticated">
      <div class="offcanvas_header">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" class="icon floatRight" @click="toggleCanvas">
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
  </section>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'navigation',
  data () {
    return {
      showMenu: false
    }
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.user.isAuthenticated
    },
    menu: function () {
      return {
        offcanvas_item: true,
        isActive: this.showMenu
      }
    },
    showOffCanvas: function () {
      return this.$store.state.navigation.showOffCanvas
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('user/isAuthenticated', false)
      this.$store.commit('user/username', null)
      this.$store.commit('user/password', null)
      this.$store.commit('user/me', null)
      this.$store.commit('book/tab', null)
      this.$store.commit('book/books', [])
      this.$store.commit('book/counter', 0)
      this.$store.commit('filter/searchTerm', null)
      this.$store.dispatch('filter/reset')
      this.$store.commit('navigation/showOffCanvas', false)
      Cookies.remove('token')
    },
    toggleMenu: function () {
      this.showMenu = !this.showMenu
    },
    closeMenu: function () {
      if (!this.showMenu) return
      this.showMenu = false
    },
    toggleCanvas: function () {
      this.$store.dispatch('navigation/toggleOffCanvas')
    }
  }
}
</script>

<style scoped>
.offcanvas_overlay {
  visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-backgroundDark);
  opacity: 0;
  transition: visibility 0.2s, opacity 0.2s;
}
.offcanvas_overlay.isActive {
  visibility: visible;
  opacity: 0.7;
}
</style>
