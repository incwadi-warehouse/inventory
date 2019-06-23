<template>
  <section>
    <list/>
    <create v-if="showForm"/>
  </section>
</template>

<script>
import List from '../components/genre/List'
import Create from '../components/genre/Create'

export default {
  name: 'genre-view',
  components: {
    List,
    Create
  },
  methods: {
    showForm: function () {
      if (!this.$store.state.me) return
      return this.$store.state.me.roles.indexOf('ROLE_ADMIN') !== -1
    }
  },
  mounted: function () {
    this.$store.dispatch('me')
  }
}
</script>
