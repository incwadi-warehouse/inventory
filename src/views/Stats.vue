<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('stats') }}</h1>
    </section>
    <stats/>
  </section>
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
