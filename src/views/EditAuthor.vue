<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('edit_author') }}</h1>
    </section>
    <edit :id="id" />
  </section>
</template>

<script>
import Edit from '../components/author/Edit'

export default {
  name: 'edit-author-view',
  props: ['id'],
  components: {
    Edit
  }
}
</script>
