<template>
  <section class="container container_m">
    <h1>{{ $t('not_found') }}</h1>
    <p>{{ $t('not_found_desc') }}</p>
    <router-link :to="{ name: 'book' }">
      {{ $t('go_to_homepage') }}
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'not-found-view'
}
</script>
