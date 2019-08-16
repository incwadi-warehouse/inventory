<template>
  <section class="container container_m">
    <aside class="notice notice_red" v-if="hasRemoveError">
      <p class="notice_entry">
        {{ $t('removing_customer_not_possible') }}
      </p>
    </aside>

    <div class="card">
      <div class="card_item" v-for="customer in customers" :key="customer.id">
        <ul class="card_options" v-if="isAdmin">
          <li class="card_option">
            <button class="card_option_btn" :title="$t('remove')" @click="remove(customer.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" class="icon">
                <path d="M11.2 2v8H2v6h46v-6h-7.36V2zm3.68 4h22.08v4H14.88zM7.52 18v30h34.96V18z"/>
              </svg>
            </button>
          </li>
        </ul>
        <div class="card_text">
          {{customer.name}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'customer',
  computed: {
    ...mapGetters('user', [
      'isAdmin'
    ]),
    customers: function () {
      return this.$store.state.customer.customers
    },
    hasRemoveError: function () {
      return this.$store.state.customer.hasRemoveError
    }
  },
  methods: {
    remove: function (id) {
      this.$store.dispatch('customer/remove', id)
    }
  },
  created: function () {
    this.$store.dispatch('customer/customers')
  }
}
</script>
