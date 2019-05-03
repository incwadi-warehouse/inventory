<template>
  <ul class="nav">
    <li class="nav_item">
      <router-link :to="{ name: 'index' }">{{ $t('home') }}</router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'genre' }">{{ $t('genres') }}</router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'customer' }">{{ $t('customers') }}</router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'about' }">{{ $t('about') }}</router-link>
    </li>
    <li class="nav_item">
      <a href="/logout" @click.prevent="logout">Logout</a>
    </li>
  </ul>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'navigation',
  methods: {
    logout: function () {
      Cookies.remove('token')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
