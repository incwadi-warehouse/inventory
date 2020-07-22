<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('staff_members') }}</h1>
    </b-container>

    <b-container size="m">
      <staff-list v-for="member in staff" :key="member.id" :staff="member" />
    </b-container>

    <b-container size="m" v-if="me && me.isAdmin">
      <h2>{{ $t('new') }}</h2>
      <staff-create />
    </b-container>
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
    StaffCreate,
  },
  computed: {
    ...mapState('user', ['me']),
    ...mapState('staff', ['staff']),
  },
  created: function () {
    if (!this.$store.state.user.me) this.$store.dispatch('user/me')
    this.$store.dispatch('staff/staff')
  },
}
</script>
