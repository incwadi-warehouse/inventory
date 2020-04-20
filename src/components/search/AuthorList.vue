<template>
  <b-container size="m">
    <b-list v-for="author in authors" :key="author.id">
      <template #title>
        <router-link :to="{ name: 'edit-author', params: { id: author.id } }">
          {{ formatAuthor(author) }}
        </router-link>
      </template>
      <template #options>
        <b-dropdown-item>
          <b-button type="text" class="dropdown_btn" @click="edit(author.id)">
            {{ $t('edit') }}
          </b-button>
        </b-dropdown-item>
        <b-dropdown-item>
          <b-button type="text" class="dropdown_btn" @click="remove(author.id)">
            {{ $t('remove') }}
          </b-button>
        </b-dropdown-item>
      </template>
    </b-list>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'author',
  computed: {
    ...mapState('search', ['authors'])
  },
  methods: {
    ...mapActions('search', ['remove']),
    formatAuthor: function(author) {
      if (author.firstname === '') {
        return author.surname
      }
      return author.surname + ', ' + author.firstname
    },
    edit: function(author_id) {
      this.$router.push({ name: 'edit-author', params: { id: author_id } })
    }
  }
}
</script>
