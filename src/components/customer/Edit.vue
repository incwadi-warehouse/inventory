<template>
  <div class="card_text" @dblclick="toggleEditCustomer()" v-if="!editCustomer">
    {{ customer.name }}
  </div>
  <div class="card_text" v-else>
    <form class="form form_inline" @submit.prevent="update()">
      <div class="form_group">
        <div class="form_item">
          <label for="customer" class="form_label visuallyHidden">
            {{ $t('customer') }}
          </label>
        </div>
        <div class="form_item">
          <input
            type="text"
            id="customer"
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
  name: 'edit-customer',
  props: ['customer'],
  data() {
    return {
      name: this.customer.name,
      editCustomer: false
    }
  },
  methods: {
    update: function() {
      this.toggleEditCustomer()
      this.$store.dispatch('customer/edit', {
        id: this.customer.id,
        name: this.name
      })
    },
    toggleEditCustomer: function() {
      this.editCustomer = !this.editCustomer
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
