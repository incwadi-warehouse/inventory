<template>
  <section class="container container_m" v-if="stats">
    <ul class="list">
      <li><b>{{ stats.all }}</b> {{ $t('all_books') }}</li>
      <li><b>{{ stats.available }}</b> {{ $t('available_books') }}</li>
      <li><b>{{ stats.sold }}</b> {{ $t('sold_books') }}</li>
      <li><b>{{ stats.removed }}</b> {{ $t('removed_books') }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'stats',
  computed: {
    stats: function () {
      return this.$store.state.stats.stats
    }
  },
  created: function () {
    this.$store.dispatch('stats/stats')
  }
}
</script>
