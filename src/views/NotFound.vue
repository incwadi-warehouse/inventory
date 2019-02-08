<template>
  <section class="section section_fixed">
    <h1>Error 404 - Page not found!</h1>
    <p>The page could not be found! Please change references to this site!</p>
    <router-link :to="{name: 'index'}">Go to homepage</router-link>
  </section>
</template>

<script>
export default {
  name: 'not-found-view'
}
</script>
