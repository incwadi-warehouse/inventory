<template>
  <ul class="hamburger" v-if="isAuthenticated">
    <li :class="menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25.000001 25.000001" @click="toggleMenu">
        <path d="M0 2h25v4H0zm0 16h25v4H0zm0-8h25v4H0z" class="icon"/>
      </svg>
      <div class="hamburger_secondary" @click="closeMenu">
        <ul class="hamburger_box">
          <li class="hamburger_secondary_item">
            {{ $t('menu') }}
          </li>
          <li class="hamburger_secondary_item">
            <router-link :to="{ name: 'book' }">
              {{ $t('search') }}
            </router-link>
          </li>
          <li class="hamburger_secondary_item">
            <router-link :to="{ name: 'genre' }">
              {{ $t('genres') }}
            </router-link>
          </li>
          <li class="hamburger_secondary_item">
            <router-link :to="{ name: 'customer' }">
              {{ $t('customers') }}
            </router-link>
          </li>
          <li class="hamburger_secondary_item">
            <router-link :to="{ name: 'stats' }">
              {{ $t('stats') }}
            </router-link>
          </li>
          <li class="hamburger_secondary_item">
            <router-link :to="{ name: 'about' }">
              {{ $t('about') }}
            </router-link>
          </li>
        </ul>
        <ul class="hamburger_box">
          <li class="hamburger_secondary_item">
            {{ $t('profile') }}
          </li>
          <li class="hamburger_secondary_item">
            <a href="/logout" @click.prevent="logout">
              {{ $t('logout') }}
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
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
        hamburger_item: true,
        isActive: this.showMenu
      }
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
      Cookies.remove('token')
      this.$router.push({ name: 'book' })
      this.$store.dispatch('filter/reset')
    },
    toggleMenu: function () {
      this.showMenu = !this.showMenu
    },
    closeMenu: function () {
      if (!this.showMenu) return
      this.showMenu = false
    }
  }
}
</script>

<style>
.icon {
  fill: var(--color-fontDark);
}
</style>
