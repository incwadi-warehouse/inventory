<template>
  <b-container size="m">
    <b-list v-for="member in staff" :key="member.id">
      <template #options>
        <b-dropdown position="mouse">
          <template #selector>
            <b-icon type="more" />
          </template>
          <b-dropdown-item
            :title="$t('remove')"
            icon="bin"
            @click="remove(member.id)"
            v-if="isAdmin"
          />
        </b-dropdown>
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
