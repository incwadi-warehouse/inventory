<template>
  <section>
    <section class="container container_m">
      <h1>{{ $t('staff_members') }}</h1>
    </section>
    <list />
    <create v-if="isAdmin" />
  </section>
</template>

<script>
import List from '../components/staff/List'
import Create from '../components/staff/Create'
import { mapGetters } from 'vuex'

export default {
  name: 'staff-view',
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
