<template>
  <b-container size="m">
    <h1>{{ $t('notFound') }}</h1>
    <p>{{ $t('notFoundDesc') }}</p>

    <router-link :to="{ name: 'index' }">
      {{ $t('goToHomepage') }}
    </router-link>

    <b-not-found />
  </b-container>
</template>

<script>
export default {
  name: 'not-found-view',
  head: {
    title: 'Not Found',
  },
}
</script>
