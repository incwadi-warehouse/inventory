<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('staff_members') }}</h1>
    </b-container>
    <list />
    <create v-if="isAdmin" />
  </article>
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
  }
}
</script>
