<template>
  <span @dblclick="toggleEditStaff()" v-if="!editStaff">
    {{ staff.name }}
  </span>
  <b-form @submit.prevent="update()" v-else>
    <b-form-group>
      <b-form-item>
        <b-form-label for="staff" class="visuallyHidden">
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
