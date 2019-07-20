<template>
  <section class="section section_fixed">
    <h1>{{ $t('customers') }}</h1>
    <ul class="list">
      <li v-for="customer in customers" :key="customer.id">
        {{customer.name}} <button class="btn btn_link" @click="remove(customer.id)" v-if="isAdmin">{{ $t('remove') }}</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'customer',
  computed: {
    customers: function () {
      return this.$store.state.customer.customers
    },
    isAdmin: function () {
      if (!this.$store.state.user.me) return
      return this.$store.state.user.me.roles.indexOf('ROLE_ADMIN') !== -1
    }
  },
  methods: {
    remove: function (id) {
      this.$store.dispatch('customer/removeCustomer', id)
    }
  },
  mounted: function () {
    this.$store.dispatch('customer/customers')
  }
}
</script>
