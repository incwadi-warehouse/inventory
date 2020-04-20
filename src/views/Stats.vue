<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('stats') }}</h1>
    </b-container>
    <b-container size="m" v-show="loading">
      <b-spinner size="l" />
    </b-container>
    <stats />
  </article>
</template>

<script>
import Stats from './../components/stats/Stats'
import { mapState } from 'vuex'

export default {
  name: 'stats-view',
  components: {
    Stats
  },
  computed: {
    ...mapState('stats', ['loading'])
  }
}
</script>
