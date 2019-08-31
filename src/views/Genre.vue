<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('genres') }}</h1>
    </section>
    <list />
    <create v-if="isAdmin" />
  </section>
</template>

<script>
import List from '../components/genre/List'
import Create from '../components/genre/Create'
import { mapGetters } from 'vuex'

export default {
  name: 'genre-view',
  components: {
    List,
    Create
  },
  computed: {
    ...mapGetters('user', ['isAdmin'])
  },
  mounted: function() {
    this.$store.dispatch('user/me')
  }
}
</script>
