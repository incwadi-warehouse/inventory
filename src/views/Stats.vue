<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('stats') }}</h1>
    </b-container>
    <stats />
  </article>
</template>

<script>
import Stats from './../components/stats/Stats'

export default {
  name: 'stats-view',
  components: {
    Stats
  }
}
</script>
