<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('genres') }}</h1>
    </b-container>

    <b-container size="m" v-if="genres.length > 0">
      <genre-list
        v-for="genre in genres"
        :key="genre.id"
        :genre="genre"
        :me="me"
      />
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
import useAuth from '@/composables/useAuth'
import { toRefs } from '@vue/composition-api'

export default {
  name: 'genre-view',
  head: {
    title: 'Genre',
  },
  components: {
    GenreList,
    GenreCreate,
  },
  setup() {
    const { getUser, state } = useAuth()
    getUser()
    const { me } = toRefs(state)

    return { me }
  },
  computed: {
    ...mapState('genre', ['genres']),
  },
  created: function () {
    this.$store.dispatch('genre/genres')
  },
}
</script>
