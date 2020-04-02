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
    <b-button type="outline_danger" @click="clean" v-if="isAdmin">
      {{ $t('clean_books') }}
    </b-button>
  </b-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'stats',
  computed: {
    ...mapState('stats', ['stats']),
    ...mapGetters('user', ['isAdmin'])
  },
  methods: {
    ...mapActions('book', ['clean'])
  },
  created: function() {
    this.$store.dispatch('stats/stats')
    this.$store.dispatch('user/me')
  }
}
</script>
