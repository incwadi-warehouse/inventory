<template>
  <b-container size="m">
    <b-list v-for="member in staff" :key="member.id">
      <template #options>
        <b-dropdown-item v-if="isAdmin">
          <b-button type="text" class="dropdown_btn" @click="remove(member.id)">
            {{ $t('remove') }}
          </b-button>
        </b-dropdown-item>
      </template>
      <template #title>
        <edit-staff :staff="member" />
      </template>
    </b-list>
  </b-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import EditStaff from './Edit'

export default {
  name: 'list',
  components: {
    EditStaff
  },
  computed: {
    ...mapGetters('user', ['isAdmin']),
    ...mapState('staff', ['staff'])
  },
  methods: {
    ...mapActions('staff', ['remove'])
  },
  created: function() {
    this.$store.dispatch('staff/staff')
  }
}
</script>
