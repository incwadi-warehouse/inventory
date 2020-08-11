<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('staff_members') }}</h1>
    </b-container>
    <staff-list />
    <staff-create v-if="me.isAdmin" />
  </article>
</template>

<script>
import StaffList from '../components/staff/List'
import StaffCreate from '../components/staff/Create'
import { mapState } from 'vuex'

export default {
  name: 'staff-view',
  components: {
    StaffList,
    StaffCreate
  },
  computed: {
    ...mapState('user', ['me'])
  }
}
</script>
