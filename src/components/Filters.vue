<template>
  <section>
    <section class="section section_default alignRight noprint">
      <button class="btn btn_secondary" @click="toggleOrder">Order</button>
      <button class="btn btn_secondary" @click="toggleFilter">Filter</button>
    </section>

    <section class="section section_default noprint" v-if="filter">
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
            <label for="lending" class="form_label">Lend more then x months</label>
          </div>
          <div class="form_item">
            <input type="number" id="lending" class="form_input" v-model="lending">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="branches" class="form_label">Branches</label>
          </div>
          <div class="form_item">
            <select id="branches" class="form_input" multiple v-model="branch">
              <option value=""></option>
              <optgroup label="General">
                <option value="none">None</option>
                <option value="any">Any</option>
              </optgroup>
              <optgroup label="Branches">
                <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                  {{branch.name}}
                </option>
              </optgroup>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="genre" class="form_label">Genre</label>
          </div>
          <div class="form_item">
            <select id="genre" class="form_input" multiple v-model="genre">
              <option value=""></option>
              <optgroup label="General">
                <option value="none">None</option>
                <option value="any">Any</option>
              </optgroup>
              <optgroup label="Genres">
                <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                  {{genre.name}}
                </option>
              </optgroup>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <input type="checkbox" id="stocked" v-model="stocked">
            <label for="stocked">Stocked</label>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item alignRight">
            <button class="btn btn_secondary">Find</button>
          </div>
        </div>
      </form>
    </section>

    <section class="section section_default" v-if="order">
      <form class="form" @submit.prevent>
        <div class="form_group">
          <div class="form_item">
            <label for="ordering" class="form_label">Ordering</label>
          </div>
          <div class="form_item">
            <select id="genre" class="form_input" @change="find" v-model="ordering">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
              <option value="genre_asc">Genre Ascending</option>
              <option value="genre_desc">Genre Descending</option>
              <option value="added_asc">Added Ascending</option>
              <option value="added_desc">Added Descending</option>
              <option value="title_asc">Title Ascending</option>
              <option value="title_desc">Title Descending</option>
              <option value="author_asc">Author Ascending</option>
              <option value="author_desc">Author Descending</option>
              <option value="price_asc">Price Ascending</option>
              <option value="price_desc">Price Descending</option>
              <option value="yearOfPublication_asc">Year of Publication Ascending</option>
              <option value="yearOfPublication_desc">Year of Publication Descending</option>
              <option value="type_asc">Type Ascending</option>
              <option value="type_desc">Type Descending</option>
              <option value="premium_asc">Premium Ascending</option>
              <option value="premium_desc">Premium Descending</option>
            </select>
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
      order: false,
      stocked: true,
      older: 0,
      branch: [],
      genre: ['any'],
      lending: 0,
      ordering: 'asc'
    }
  },
  computed: {
    branches: function () {
      return this.$store.state.branches
    },
    genres: function () {
      return this.$store.state.genres
    },
    counter: function () {
      return this.$store.state.books.counter
    }
  },
  methods: {
    toggleFilter: function () {
      this.filter = !this.filter
      this.order = false
    },
    toggleOrder: function () {
      this.order = !this.order
      this.filter = false
    },
    find: function () {
      let added = new Date()
      added.setMonth(added.getMonth() - this.older)
      let lending = new Date()
      lending.setMonth(lending.getMonth() - this.lending)
      this.$store.commit('stocked', this.stocked ? null : 0)
      this.$store.commit('added', this.older !== 0 ? Math.round(added.getTime() / 1000) : null)
      this.$store.commit('branch', this.branch.length >= 1 ? this.branch.join(',') : null)
      console.log(this.genre.length)
      this.$store.commit('genreFilter', this.genre.length >= 1 ? this.genre.join(',') : null)
      this.$store.commit('lending', this.lending !== 0 ? Math.round(lending / 1000) : null)
      this.$store.commit('sort', this.ordering !== 'asc' ? this.ordering : null)
      this.$store.dispatch('search')
    }
  },
  mounted: function () {
    this.$store.dispatch('branches')
    this.$store.dispatch('genres')
  },
  watch: {
    ordering: function () {
      this.find()
    }
  }
}
</script>
