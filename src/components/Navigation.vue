<template>
  <ul class="nav">
    <li class="nav_item">
      <router-link :to="{ name: 'index' }">Home</router-link>
    </li>
    <li class="nav_item">
      <router-link :to="{ name: 'create' }">Create</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'navigation'
}
</script>
