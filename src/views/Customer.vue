<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('customers') }}</h1>
    </section>
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
      if (!this.$store.state.user.me) return

      return this.$store.state.user.me.roles.indexOf('ROLE_ADMIN') !== -1
    }
  },
  mounted: function () {
    this.$store.dispatch('user/me')
  }
}
</script>
