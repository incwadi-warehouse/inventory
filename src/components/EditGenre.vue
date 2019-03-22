<template>
  <section class="section section_fixed" v-if="showForm">
    <h2>Neu</h2>
    <form class="form" @submit.prevent="create">
      <div class="form_group">
        <div class="form_item">
          <label for="name" class="form_label">Name</label>
        </div>
        <div class="form_item">
          <input type="text" id="name" class="form_input" v-model="name">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_secondary" @click.prevent="create">Create</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'edit-genre',
  data () {
    return {
      name: null
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('createGenre', this.name)
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
