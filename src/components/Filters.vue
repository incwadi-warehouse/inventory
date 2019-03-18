<template>
  <section>
    <section class="section section_default alignRight">
      <button class="btn btn_secondary" @click="toggleFilter">Filter</button>
    </section>

    <section class="section section_default" v-if="filter">
      <form class="form" @submit.prevent="find">
        <div class="form_group">
          <div class="form_item">
            <input type="checkbox" id="stocked" v-model="stocked">
            <label for="stocked" class="form_label">Stocked</label>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="older" class="form_label">Older then x months</label>
          </div>
          <div class="form_item">
            <input type="number" id="older" class="form_input" v-model="older">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <button class="btn btn_secondary">Find</button>
          </div>
        </div>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  name: 'filters',
  data () {
    return {
      filter: false,
      stocked: true,
      older: 0
    }
  },
  methods: {
    toggleFilter: function () {
      this.filter = !this.filter
    },
    find: function () {
      let added = new Date()
      added.setMonth(added.getMonth() - this.older)
      this.$store.dispatch('search', {
        term: this.$store.state.searchTerm,
        limit: 20,
        offset: this.$store.state.offset,
        stocked: this.stocked ? 1 : 0,
        added: Math.round(added.getTime() / 1000)
      })
    }
  }
}
</script>
