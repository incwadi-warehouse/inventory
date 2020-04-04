<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('edit_book') }}</h1>
    </b-container>
    <edit :id="id" />
  </article>
</template>

<script>
import Edit from '../components/book/Edit'

export default {
  name: 'edit-view',
  props: ['id'],
  components: {
    Edit
  }
}
</script>
