<template>
  <ul class="nav">
    <li class="nav_item">
      <router-link :to="{ name: 'index' }">{{ $t('home') }}</router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'create' }">{{ $t('create') }}</router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'genre' }">{{ $t('genres') }}</router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'about' }">{{ $t('about') }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'navigation'
}
</script>
