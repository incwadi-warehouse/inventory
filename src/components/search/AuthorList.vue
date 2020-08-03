<template>
  <b-container size="m">
    <b-list v-for="author in authors" :key="author.id">
      <template #title>
        <router-link :to="{ name: 'author', params: { id: author.id } }">
          {{ author | formatAuthor }}
        </router-link>
      </template>
      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="more" />
          </template>
          <b-dropdown-item
            :title="$t('edit')"
            icon="pencil"
            @click="edit(author.id)"
          />
          <b-dropdown-item
            :title="$t('remove')"
            icon="bin"
            @click="remove(author.id)"
          />
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
    ...mapActions('search', ['remove']),
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
