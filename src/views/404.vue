<template>
  <b-container size="m">
    <h1>{{ $t('not_found') }}</h1>
    <p>{{ $t('not_found_desc') }}</p>
    <router-link :to="{ name: 'search' }">
      {{ $t('go_to_homepage') }}
    </router-link>
  </b-container>
</template>

<script>
export default {
  name: '404-view',
}
</script>
