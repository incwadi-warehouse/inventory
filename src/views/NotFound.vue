<template>
  <section class="section section_fixed">
    <h1>{{ $t('not_found') }}</h1>
    <p>{{ $t('not_found_desc') }}</p>
    <router-link :to="{ name: 'index' }">{{ $t('go_to_homepage') }}</router-link>
  </section>
</template>

<script>
export default {
  name: 'not-found-view'
}
</script>
