<template>
  <b-container size="m">
    <b-list v-for="genre in genres" :key="genre.id">
      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="more" />
          </template>
          <b-dropdown-item
            :title="$t('remove')"
            icon="bin"
            @click="remove(genre.id)"
            v-if="me.isAdmin"
          />
        </b-dropdown>
      </template>
      <template #title>
        <genre-edit :genre="genre" />
      </template>
    </b-list>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GenreEdit from './Edit'

export default {
  name: 'list-genre',
  components: {
    GenreEdit
  },
  computed: {
    ...mapState('user', ['me']),
    ...mapState('genre', ['genres'])
  },
  methods: {
    ...mapActions('genre', ['remove'])
  },
  created: function() {
    this.$store.dispatch('genre/genres')
  }
}
</script>
