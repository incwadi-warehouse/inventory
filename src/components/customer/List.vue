<template>
  <section class="section section_fixed">
    <h1>{{ $t('customers') }}</h1>
    <ul class="list">
      <li v-for="customer in customers" :key="customer.id">{{customer.name}} <button class="btn btn_link" @click="remove(customer.id)">{{ $t('remove') }}</button></li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'customer',
  computed: {
    customers: function () {
      return this.$store.state.customers
    }
  },
  methods: {
    remove: function (id) {
      this.$store.dispatch('removeCustomer', id)
    }
  },
  mounted: function () {
    this.$store.dispatch('customers')
  }
}
</script>
