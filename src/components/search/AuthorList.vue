<template>
  <b-container size="m">
    <b-list v-for="author in authors" :key="author.id">
      <template #title>
        <router-link :to="{ name: 'author', params: { id: author.id } }">
          {{ formatAuthor(author) }}
        </router-link>
      </template>
      <template #options>
        <b-dropdown position="mouse">
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
  name: 'author',
  computed: {
    ...mapState('search', ['authors']),
  },
  methods: {
    ...mapActions('search', ['remove']),
    formatAuthor: function (author) {
      if (author.firstname === '') {
        return author.surname
      }
      return author.surname + ', ' + author.firstname
    },
    edit: function (author_id) {
      this.$router.push({ name: 'author', params: { id: author_id } })
    },
  },
}
</script>
