<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('staff_members') }}</h1>
    </b-container>

    <b-container size="m">
      <staff-list
        v-for="member in staff"
        :key="member.id"
        :staff="member"
        :me="me"
      />
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
import useAuth from '@/composables/useAuth'
import { toRefs } from '@vue/composition-api'

export default {
  name: 'staff-view',
  head: {
    title: 'Staff',
  },
  components: {
    StaffList,
    StaffCreate,
  },
  setup() {
    const { getUser, state } = useAuth()
    getUser()
    const { me } = toRefs(state)

    return { me }
  },
  computed: {
    ...mapState('staff', ['staff']),
  },
  created: function () {
    this.$store.dispatch('staff/staff')
  },
}
</script>
