<template>
  <section class="container container_m" v-if="stats">
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
    <button class="btn btn_outline btn_outline_danger" @click="clean">
      {{ $t('clean_books') }}
    </button>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'stats',
  computed: {
    ...mapState('stats', ['stats'])
  },
  methods: {
    ...mapActions('book', ['clean'])
  },
  created: function() {
    this.$store.dispatch('stats/stats')
  }
}
</script>
