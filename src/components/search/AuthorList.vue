<template>
  <b-container size="l">
    <b-list v-for="author in authors" :key="author.id">
      <template #title>
        <router-link :to="{ name: 'author', params: { id: author.id } }">
          {{ formatAuthor(author) }}
        </router-link>
      </template>
      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="more" />
          </template>
          <b-dropdown-item icon="pencil" @click="edit(author.id)">
            {{ $t('edit') }}
          </b-dropdown-item>
          <b-dropdown-item icon="bin" @click="remove(author.id)">
            {{ $t('remove') }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-list>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'author-list-search',
  computed: {
    ...mapState('author', ['authors']),
  },
  methods: {
    ...mapActions('author', ['remove']),
    edit(authorId) {
      this.$router.push({ name: 'author', params: { id: authorId } })
    },
  },
  filters: {
    formatAuthor(author) {
      if (author.firstname === '') {
        return author.surname
      }

      return author.surname + ', ' + author.firstname
    },
  },
}
</script>
