<template>
  <section class="section section_fixed" v-if="showForm">
    <h2>{{ $t('new') }}</h2>
    <form class="form" @submit.prevent="create">
      <div class="form_group">
        <div class="form_item">
          <label for="name" class="form_label">{{ $t('name') }}</label>
        </div>
        <div class="form_item">
          <input type="text" id="name" class="form_input" v-model="name">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_secondary" @click.prevent="create">{{ $t('create') }}</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'edit-customer',
  data () {
    return {
      name: null
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('createCustomer', this.name)
      this.name = null
    },
    showForm: function () {
      if (!this.$store.state.me) return
      return this.$store.state.me.roles.indexOf('ROLE_ADMIN') !== -1
    }
  },
  mounted: function () {
    this.$store.dispatch('me')
  }
}
</script>
