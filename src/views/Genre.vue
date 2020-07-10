<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('genres') }}</h1>
    </b-container>
    <list />
    <create v-if="me.isAdmin" />
  </article>
</template>

<script>
import List from '../components/genre/List'
import Create from '../components/genre/Create'
import { mapState } from 'vuex'

export default {
  name: 'genre-view',
  components: {
    List,
    Create
  },
  computed: {
    ...mapState('user', ['me'])
  }
}
</script>
