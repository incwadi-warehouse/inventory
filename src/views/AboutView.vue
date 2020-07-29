<template>
  <b-container size="m">
    <h1>incwadi</h1>
    <p>{{ $t('license') }}</p>
    <p>{{ $t('repo') }}</p>
    <p><a href="https://gitlab.com/incwadi/">Gitlab-Repository</a></p>
    <p>{{ $t('contribution') }}</p>
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
