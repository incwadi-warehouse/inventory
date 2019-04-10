<template>
  <ul class="nav">
    <li class="nav_item">
      <router-link :to="{ name: 'index' }">{{ $t('home') }}</router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'genre' }">{{ $t('genres') }}</router-link>
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
export default {
  name: 'navigation',
  methods: {
    logout: function () {
      localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
