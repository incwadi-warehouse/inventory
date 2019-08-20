<template>
  <section class="container container_m">
    <form class="form" @submit.prevent="save">
      <div class="form_group">
        <div class="form_item">
          <label for="password" class="form_label">Password</label>
        </div>
        <div class="form_item">
          <input type="password" id="password" class="form_input" v-model="password">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <button class="btn btn_primary floatRight" @submit.prevent="save">Save</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'password',
  data () {
    return {
      password: null
    }
  },
  methods: {
    save: function () {
      this.$store.dispatch('user/password', this.password)
      this.password = null
    }
  }
}
</script>
