<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('customers') }}</h1>
    </section>
    <list/>
    <create v-if="isAdmin"/>
  </section>
</template>

<script>
import List from '../components/customer/List'
import Create from '../components/customer/Create'
import { mapGetters } from 'vuex'

export default {
  name: 'customer-view',
  components: {
    List,
    Create
  },
  computed: {
    ...mapGetters('user', [
      'isAdmin'
    ])
  },
  mounted: function () {
    this.$store.dispatch('user/me')
  }
}
</script>
