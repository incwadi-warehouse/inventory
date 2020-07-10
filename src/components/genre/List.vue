<template>
  <b-container size="m">
    <b-list v-for="genre in genres" :key="genre.id">
      <template #options>
        <b-dropdown-item v-if="me.isAdmin">
          <b-button type="text" class="dropdown_btn" @click="remove(genre.id)">
            {{ $t('remove') }}
          </b-button>
        </b-dropdown-item>
      </template>
      <template #title>
        <edit-genre :genre="genre" />
      </template>
    </b-list>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EditGenre from './Edit'

export default {
  name: 'genre',
  components: {
    EditGenre
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
