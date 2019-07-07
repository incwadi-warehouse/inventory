<template>
  <ul class="nav" v-if="isAuthenticated">
    <li class="nav_item">
      <router-link :to="{ name: 'book' }">
        {{ $t('search') }}
      </router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'genre' }">
        {{ $t('genres') }}
      </router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'customer' }">
        {{ $t('customers') }}
      </router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'about' }">
        {{ $t('about') }}
      </router-link>
    </li>
    <li class="nav_item">
      <a href="/logout" @click.prevent="logout">
        Logout
      </a>
    </li>
  </ul>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'navigation',
  computed: {
    isAuthenticated: function () {
      return this.$store.state.user.isAuthenticated
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('user/isAuthenticated', false)
      Cookies.remove('token')
      this.$router.push({ name: 'book' })
    }
  }
}
</script>
