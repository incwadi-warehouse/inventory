<template>
  <section class="section section_fixed">
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
    }
  }
}
</script>
