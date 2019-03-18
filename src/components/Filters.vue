<template>
  <section>
    <section class="section section_default alignRight">
      <button class="btn btn_secondary" @click="toggleFilter">Filter</button>
    </section>

    <section class="section section_default" v-if="filter">
      <form class="form" @submit.prevent="find">
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
            <input type="checkbox" id="stocked" v-model="stocked">
            <label for="stocked">Stocked</label>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="branches" class="form_label">Branches</label>
          </div>
          <div class="form_item">
            <select id="branches" class="form_input" v-model="branch">
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{branch.name}}
              </option>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="genre" class="form_label">Genre</label>
          </div>
          <div class="form_item">
            <select id="genre" class="form_input" v-model="genre">
              <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                {{genre.name}}
              </option>
            </select>
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
      older: 0,
      branch: null,
      genre: null
    }
  },
  computed: {
    branches: function () {
      return this.$store.state.branches
    },
    genres: function () {
      return this.$store.state.genres
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
        added: Math.round(added.getTime() / 1000),
        branch: this.branch,
        genre: this.genre
      })
    }
  },
  mounted: function () {
    this.$store.dispatch('branches')
    this.$store.dispatch('genres')
  }
}
</script>
