<template>
  <span @dblclick="toggleEditStaff()" v-if="!editStaff">
    {{ staff.name }}
  </span>
  <b-form @submit.prevent="update()" v-else>
    <div class="form_group">
      <div class="form_item">
        <label for="staff" class="form_label visuallyHidden">
          {{ $t('staff') }}
        </label>
      </div>
      <div class="form_item">
        <input
          type="text"
          id="staff"
          class="form_input"
          v-model="name"
          v-focus
        />
      </div>
    </div>
  </b-form>
</template>

<script>
export default {
  name: 'edit-staff',
  props: {
    staff: Object
  },
  data() {
    return {
      name: this.staff.name,
      editStaff: false
    }
  },
  methods: {
    update: function() {
      this.toggleEditStaff()
      this.$store.dispatch('staff/edit', {
        id: this.staff.id,
        name: this.name
      })
    },
    toggleEditStaff: function() {
      this.editStaff = !this.editStaff
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  }
}
</script>
