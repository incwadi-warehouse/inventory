<template>
  <b-container size="m" v-if="stats">
    <ul class="list">
      <li>
        <b>{{ stats.all }}</b> {{ $t('all_books') }}
      </li>
      <li>
        <b>{{ stats.available }}</b> {{ $t('available_books') }}
      </li>
      <li>
        <b>{{ stats.sold }}</b> {{ $t('sold_books') }}
      </li>
      <li>
        <b>{{ stats.removed }}</b> {{ $t('removed_books') }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'stats',
  computed: {
    ...mapState('stats', ['stats'])
  },
  created: function() {
    this.$store.dispatch('stats/stats')
  }
}
</script>
