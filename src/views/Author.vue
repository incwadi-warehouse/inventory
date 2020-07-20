<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('edit_author') }}</h1>
    </b-container>

    <b-container size="m">
      <author-edit :id="id" />
    </b-container>
  </article>
</template>

<script>
import AuthorEdit from '../components/author/Edit'

export default {
  name: 'author-view',
  props: {
    id: Number,
  },
  components: {
    AuthorEdit,
  },
}
</script>
