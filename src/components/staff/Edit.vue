<template>
  <span @dblclick="toggleEdit()" v-if="!edit">
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
      edit: false
    }
  },
  methods: {
    update: function() {
      this.toggleEdit()
      this.$store.dispatch('staff/edit', {
        id: this.staff.id,
        name: this.name
      })
    },
    toggleEdit: function() {
      this.edit = !this.edit
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
