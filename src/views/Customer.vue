<template>
  <section>
    <list/>
    <create v-if="showForm"/>
  </section>
</template>

<script>
import List from '../components/customer/List'
import Create from '../components/customer/Create'

export default {
  name: 'customer-view',
  components: {
    List,
    Create
  },
  computed: {
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
