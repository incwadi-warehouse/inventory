<template>
  <section class="section section_default noprint" v-if="showFilters">
    <form class="form" @submit.prevent="find">
      <div class="form_group">
        <div class="form_item">
          <label for="genre" class="form_label">{{ $t('genre') }}</label>
        </div>
        <div class="form_item">
          <input type="checkbox" value="none" id="none" v-model="genre">
          <label for="none" class="form_label">{{ $t('none') }}</label>
          <input type="checkbox" value="any" id="any" v-model="genre">
          <label for="any" class="form_label">{{ $t('any') }}</label>
          <span v-for="item in genres" :key="item.id">
            <input type="checkbox" :value="item.id" :id="'genre-' + item.id" v-model="genre">
            <label :for="'genre-' + item.id" class="form_label">{{item.name}}</label>
          </span>
        </div>
      </div>
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
          <input type="checkbox" name="branch" id="none" value="none" v-model="branch">
          <label for="none" class="form_label">{{ $t('none') }}</label>
          <input type="checkbox" name="branch" id="any" value="any" v-model="branch">
          <label for="any" class="form_label">{{ $t('any') }}</label>
          <span v-for="item in branches" :key="item.id">
            <input type="checkbox" name="branch" :id="'branch-' + item.id" :value="item.id" v-model="branch">
            <label :for="'branch-' + item.id" class="form_label">{{item.name}}</label>
          </span>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <input type="checkbox" id="stocked" v-model="stocked">
          <label for="stocked">{{ $t('stocked') }}</label>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="older" class="form_label">{{ $t('release_year') }}</label>
        </div>
        <div class="form_item">
          <input type="number" id="older" class="form_input" v-model="yearOfPublication">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="orderBy" class="form_label">{{ $t('type') }}</label>
        </div>
        <div class="form_item">
          <select id="orderBy" class="form_input" v-model="type">
            <option value=""></option>
            <option value="paperback">{{ $t('paperback') }}</option>
            <option value="hardcover">{{ $t('hardcover') }}</option>
          </select>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="orderBy" class="form_label">{{ $t('orderBy') }}</label>
        </div>
        <div class="form_item">
          <select id="orderBy" class="form_input" v-model="orderBy">
            <option value=""></option>
            <option value="title_asc">{{ $t('title') }} {{ $t('asc') }}</option>
            <option value="title_desc">{{ $t('title') }} {{ $t('desc') }}</option>
            <option value="author_asc">{{ $t('author') }} {{ $t('asc') }}</option>
            <option value="author_desc">{{ $t('author') }} {{ $t('desc') }}</option>
            <option value="genre_asc">{{ $t('genre') }} {{ $t('asc') }}</option>
            <option value="genre_desc">{{ $t('genre') }} {{ $t('desc') }}</option>
            <option value="added_asc">{{ $t('added') }} {{ $t('asc') }}</option>
            <option value="added_desc">{{ $t('added') }} {{ $t('desc') }}</option>
            <option value="price_asc">{{ $t('price') }} {{ $t('asc') }}</option>
            <option value="price_desc">{{ $t('price') }} {{ $t('desc') }}</option>
          </select>
        </div>
      </div>
    </form>

    <p>{{ $t('limit') }}</p>
    <button class="btn btn_link" @click="setLimit(10)">10</button>
    <button class="btn btn_link" @click="setLimit(20)">20</button>
    <button class="btn btn_link" @click="setLimit(50)">50</button>
    <button class="btn btn_link" @click="setLimit(100)">100</button>
  </section>
</template>

<script>
export default {
  name: 'filters',
  data () {
    return {
      filter: false,
      orderBy: null
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
    },
    showFilters: function () {
      return this.$store.state.showFilters
    },
    stocked: {
      get: function () {
        return this.$store.state.filter.stocked || true
      },
      set: function (stocked) {
        this.$store.commit('filter/stocked', stocked ? 1 : 0)
      }
    },
    older: {
      get: function () {
        return this.$store.state.filter.added || 0
      },
      set: function (older) {
        this.$store.commit('filter/added', older)
      }
    },
    branch: {
      get: function () {
        return this.$store.state.filter.branch || []
      },
      set: function (branch) {
        this.$store.commit('filter/branch', branch)
      }
    },
    genre: {
      get: function () {
        return this.$store.state.filter.genreFilter || ['any']
      },
      set: function (genre) {
        this.$store.commit('filter/genreFilter', genre)
      }
    },
    lending: {
      get: function () {
        return this.$store.state.filter.lending || 0
      },
      set: function (lending) {
        this.$store.commit('filter/lending', lending)
      }
    },
    sort: {
      get: function () {
        return this.$store.state.filter.sort
      },
      set: function (sort) {
        this.$store.commit('filter/sort', this.orderBy)
      }
    },
    yearOfPublication: {
      get: function () {
        return this.$store.state.filter.yearOfPublication
      },
      set: function (yearOfPublication) {
        this.$store.commit('filter/yearOfPublication', yearOfPublication)
      }
    },
    type: {
      get: function () {
        return this.$store.state.filter.type
      },
      set: function (type) {
        this.$store.commit('filter/type', type)
      }
    }
  },
  methods: {
    setLimit: function (limit) {
      this.$store.commit('filter/limit', limit)
      this.$store.dispatch('books/search')
    }
  },
  mounted: function () {
    this.$store.dispatch('branches/branches')
    this.$store.dispatch('genres/genres')
  }
}
</script>
