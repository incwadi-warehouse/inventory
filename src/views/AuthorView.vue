<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('edit_author') }}</h1>
    </b-container>

    <b-container size="m" v-if="author">
      <author-edit :author="author" />
    </b-container>
  </article>
</template>

<script>
import AuthorEdit from '../components/author/Edit'
import { mapState } from 'vuex'

export default {
  name: 'author-view',
  head: {
    title: 'Author',
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    AuthorEdit,
  },
  computed: {
    ...mapState('author', ['author']),
  },
  created: function () {
    this.$store.dispatch('author/show', this.id)
  },
}
</script>
