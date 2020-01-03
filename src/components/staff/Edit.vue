<template>
  <div class="card_text" @dblclick="toggleEditStaff()" v-if="!editStaff">
    {{ staff.name }}
  </div>
  <div class="card_text" v-else>
    <form class="form form_inline" @submit.prevent="update()">
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
            v-focus
            v-model="name"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'edit-staff',
  props: ['staff'],
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

<style>
.form_inline {
  margin: 0;
}
</style>
