<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('staff_members') }}</h1>
    </b-container>
    <list />
    <create v-if="me.isAdmin" />
  </article>
</template>

<script>
import List from '../components/staff/List'
import Create from '../components/staff/Create'
import { mapState } from 'vuex'

export default {
  name: 'staff-view',
  components: {
    List,
    Create
  },
  computed: {
    ...mapState('user', ['me'])
  }
}
</script>
