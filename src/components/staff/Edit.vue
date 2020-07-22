<template>
  <span @dblclick="toggleEdit" v-if="!isEditing">
    {{ staff.name }}
  </span>
  <b-form @submit.prevent="update" v-else>
    <b-form-group>
      <b-form-item>
        <b-form-label for="staff" hidden>
          {{ $t('staff') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="staff" v-model="name" v-focus />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'edit-staff',
  props: {
    staff: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.staff.name,
      isEditing: false,
    }
  },
  methods: {
    update: function () {
      this.toggleEdit()
      this.$store.dispatch('staff/edit', {
        id: this.staff.id,
        name: this.name,
      })
    },
    toggleEdit: function () {
      this.isEditing = !this.isEditing
    },
  },
}
</script>
