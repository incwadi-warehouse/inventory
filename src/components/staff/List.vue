<template>
  <b-list>
    <template #options v-if="me">
      <b-dropdown>
        <template #selector>
          <b-icon type="more" />
        </template>
        <b-dropdown-item icon="bin" @click="remove(staff.id)" v-if="me.isAdmin">
          {{ $t('remove') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>

    <template #title>
      <edit-staff :staff="staff" />
    </template>
  </b-list>
</template>

<script>
import { mapActions } from 'vuex'
import EditStaff from './Edit'

export default {
  name: 'list-staff',
  components: {
    EditStaff,
  },
  props: {
    staff: {
      type: Object,
      required: true,
    },
    me: Object,
  },
  methods: {
    ...mapActions('staff', ['remove']),
  },
}
</script>
