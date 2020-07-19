<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('genres') }}</h1>
    </b-container>
    <genre-list />
    <genre-create v-if="isAdmin" />
  </article>
</template>

<script>
import GenreList from '../components/genre/List'
import GenreCreate from '../components/genre/Create'
import { mapState } from 'vuex'

export default {
  name: 'genre-view',
  components: {
    GenreList,
    GenreCreate,
  },
  computed: {
    ...mapState('user', ['me']),
  },
}
</script>
