<template>
  <b-container size="m">
    <h1>incwadi</h1>
    <p>{{ $t('license') }}</p>
    <p>{{ $t('repo') }}</p>
    <p><a href="https://github.com/abaldeweg/incwadi_core">Repository core</a></p>
    <p><a href="https://github.com/abaldeweg/incwadi_inventory">Repository inventory</a></p>
    <p><a href="https://github.com/abaldeweg/incwadi_find">Repository find</a></p>
    <p>{{ $t('contribution') }}</p>

    <b-divider />
    <p v-html="$t('cache_advise')" />
  </b-container>
</template>

<script>
export default {
  name: 'about-view',
  head: {
    title: 'About',
  },
}
</script>
