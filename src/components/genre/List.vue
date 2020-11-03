<template>
  <b-list>
    <template #options v-if="me">
      <b-dropdown>
        <template #selector>
          <b-icon type="more" />
        </template>
        <b-dropdown-item icon="bin" @click="remove(genre.id)" v-if="me.isAdmin">
          {{ $t('remove') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>

    <template #title>
      <genre-edit :genre="genre" />
    </template>
  </b-list>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GenreEdit from './Edit'

export default {
  name: 'list-genre',
  props: {
    genre: {
      type: Object,
      required: true,
    },
  },
  components: {
    GenreEdit,
  },
  computed: {
    ...mapState('user', ['me']),
  },
  methods: {
    ...mapActions('genre', ['remove']),
  },
}
</script>
