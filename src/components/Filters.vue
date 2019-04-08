<template>
  <section>
    <section class="section section_default alignRight noprint">
      <button class="btn btn_secondary" @click="toggleFilter">{{ $t('filter') }}</button>
      <button class="btn btn_secondary" @click="toggleShowCreate">{{ $t('create') }}</button>
    </section>

    <section class="section section_default noprint" v-if="filter">
      <form class="form" @submit.prevent="find">
        <div class="form_group">
          <div class="form_item">
            <label for="older" class="form_label">{{ $t('older_then_x_months') }}</label>
          </div>
          <div class="form_item">
            <input type="number" id="older" class="form_input" v-model="older">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="lending" class="form_label">{{ $t('lend_more_then_x_months') }}</label>
          </div>
          <div class="form_item">
            <input type="number" id="lending" class="form_input" v-model="lending">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="branches" class="form_label">{{ $t('branches') }}</label>
          </div>
          <div class="form_item">
            <select id="branches" class="form_input" multiple v-model="branch">
              <option value=""></option>
              <optgroup :label="$t('general')">
                <option value="none">{{ $t('none') }}</option>
                <option value="any">{{ $t('any') }}</option>
              </optgroup>
              <optgroup :label="$t('branches')">
                <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                  {{branch.name}}
                </option>
              </optgroup>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="genre" class="form_label">{{ $t('genre') }}</label>
          </div>
          <div class="form_item">
            <select id="genre" class="form_input" multiple v-model="genre">
              <option value=""></option>
              <optgroup :label="$t('general')">
                <option value="none">{{ $t('none') }}</option>
                <option value="any">{{ $t('any') }}</option>
              </optgroup>
              <optgroup :label="$t('genres')">
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
            <label for="stocked">{{ $t('stocked') }}</label>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item alignRight">
            <button class="btn btn_secondary">{{ $t('find') }}</button>
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
      branch: [],
      genre: ['any'],
      lending: 0
    }
  },
  computed: {
    branches: function () {
      return this.$store.state.branches.branches
    },
    genres: function () {
      return this.$store.state.genres.genres
    },
    counter: function () {
      return this.$store.state.books.books.counter
    }
  },
  methods: {
    toggleFilter: function () {
      this.filter = !this.filter
    },
    find: function () {
      let added = new Date()
      added.setMonth(added.getMonth() - this.older)
      let lending = new Date()
      lending.setMonth(lending.getMonth() - this.lending)
      this.$store.commit('filter/stocked', this.stocked ? null : 0)
      this.$store.commit('filter/added', this.older !== 0 ? Math.round(added.getTime() / 1000) : null)
      this.$store.commit('filter/branch', this.branch.length >= 1 ? this.branch.join(',') : null)
      this.$store.commit('filter/genreFilter', this.genre.length >= 1 ? this.genre.join(',') : null)
      this.$store.commit('filter/lending', this.lending !== 0 ? Math.round(lending / 1000) : null)
      this.$store.dispatch('books/search')
    },
    toggleShowCreate: function () {
      this.$store.dispatch('toggleShowCreate')
    }
  },
  mounted: function () {
    this.$store.dispatch('branches/branches')
    this.$store.dispatch('genres/genres')
  }
}
</script>
