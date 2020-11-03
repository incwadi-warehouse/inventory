<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('edit_book') }}</h1>
    </b-container>
    <edit :id="id" v-if="staff && genres && conditions" />
  </article>
</template>

<script>
import Edit from '../components/book/Edit'
import { mapState } from 'vuex'

export default {
  name: 'edit-view',
  head: {
    title: 'Book',
  },
  props: {
    id: String,
  },
  components: {
    Edit,
  },
  computed: {
    ...mapState('staff', ['staff']),
    ...mapState('genre', ['genres']),
    ...mapState('condition', ['conditions']),
  },
  created: function () {
    this.$store.dispatch('staff/staff')
    this.$store.dispatch('genre/genres')
    this.$store.dispatch('condition/list')
  },
}
</script>
