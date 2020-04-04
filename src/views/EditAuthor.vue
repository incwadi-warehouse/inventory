<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('edit_author') }}</h1>
    </b-container>
    <edit :id="id" />
  </article>
</template>

<script>
import Edit from '../components/author/Edit'

export default {
  name: 'edit-author-view',
  props: {
    id: Number
  },
  components: {
    Edit
  }
}
</script>
