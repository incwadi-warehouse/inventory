<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('edit_book') }}</h1>
    </section>
    <edit :id="id"/>
  </section>
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
