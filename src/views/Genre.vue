<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('genres') }}</h1>
    </b-container>

    <b-container size="m" v-if="genres.length > 0">
      <genre-list v-for="genre in genres" :key="genre.id" :genre="genre" />
    </b-container>

    <b-container size="m" v-if="me && me.isAdmin">
      <h2>{{ $t('new') }}</h2>
      <genre-create />
    </b-container>
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
    ...mapState('genre', ['genres']),
  },
  created: function () {
    this.$store.dispatch('genre/genres')
    if (!this.$store.state.user.me) this.$store.dispatch('user/me')
  },
}
</script>
