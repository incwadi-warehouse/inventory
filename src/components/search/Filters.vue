<template>
  <section class="section section_fixed">
    <button class="btn btn_link floatRight" @click="resetFilters">
      {{ $t('reset') }}
    </button>
    <form class="form" @submit.prevent="find">
      <div class="form_group">
        <div class="form_item">
          <label for="genre" class="form_label">{{ $t('genre') }}</label>
        </div>
        <div class="form_item">
          <span v-for="item in genres" :key="item.id">
            <input type="checkbox" :value="item.id" :id="'genre-' + item.id" v-model="genre">
            <label :for="'genre-' + item.id" class="form_label">{{item.name}}</label>
          </span>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="added" class="form_label">{{ $t('older_then_x_months') }}</label>
        </div>
        <div class="form_item">
          <input type="number" id="added" class="form_input" min="0" max="120" v-model="added">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="lending" class="form_label">{{ $t('lend_more_then_x_months') }}</label>
        </div>
        <div class="form_item">
          <input type="number" id="lending" class="form_input" min="0" max="120" v-model="lending">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="branches" class="form_label">{{ $t('branches') }}</label>
        </div>
        <div class="form_item">
          <span v-for="item in branches" :key="item.id">
            <input type="checkbox" :id="'branch-' + item.id" :value="item.id" v-model="branch">
            <label :for="'branch-' + item.id" class="form_label">{{item.name}}</label>
          </span>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <input type="checkbox" id="sold" v-model="sold">
          <label for="sold">{{ $t('sold') }}</label>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <input type="checkbox" id="removed" v-model="removed">
          <label for="removed">{{ $t('removed') }}</label>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="releaseYear" class="form_label">{{ $t('release_year') }}</label>
        </div>
        <div class="form_item">
          <input type="number" id="releaseYear" class="form_input" v-model="releaseYear">
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
    </form>
  </section>
</template>

<script>
export default {
  name: 'filters',
  data () {
    return {
      filter: false
    }
  },
  computed: {
    branches: function () {
      return this.$store.state.branch.branches
    },
    genres: function () {
      return this.$store.state.genre.genres
    },
    sold: {
      get: function () {
        return this.$store.state.filter.sold || false
      },
      set: function (sold) {
        this.$store.commit('filter/sold', sold ? 1 : 0)
        this.$store.dispatch('book/search')
      }
    },
    removed: {
      get: function () {
        return this.$store.state.filter.removed || false
      },
      set: function (removed) {
        this.$store.commit('filter/removed', removed ? 1 : 0)
        this.$store.dispatch('book/search')
      }
    },
    added: {
      get: function () {
        return this.$store.state.filter.added || 0
      },
      set: function (added) {
        this.$store.commit('filter/added', added)
        this.$store.dispatch('book/search')
      }
    },
    branch: {
      get: function () {
        return this.$store.state.filter.branch || (this.$store.state.user.me ? [this.$store.state.user.me.branch.id] : [])
      },
      set: function (branch) {
        this.$store.commit('filter/branch', branch)
        this.$store.dispatch('book/search')
      }
    },
    genre: {
      get: function () {
        return this.$store.state.filter.genreFilter || []
      },
      set: function (genre) {
        this.$store.commit('filter/genreFilter', genre)
        this.$store.dispatch('book/search')
      }
    },
    lending: {
      get: function () {
        return this.$store.state.filter.lending || 0
      },
      set: function (lending) {
        this.$store.commit('filter/lending', lending)
        this.$store.dispatch('book/search')
      }
    },
    releaseYear: {
      get: function () {
        return this.$store.state.filter.releaseYear
      },
      set: function (releaseYear) {
        this.$store.commit('filter/releaseYear', releaseYear)
        this.$store.dispatch('book/search')
      }
    },
    type: {
      get: function () {
        return this.$store.state.filter.type
      },
      set: function (type) {
        this.$store.commit('filter/type', type)
        this.$store.dispatch('book/search')
      }
    }
  },
  methods: {
    resetFilters: function () {
      this.$store.dispatch('filter/reset')
    }
  },
  mounted: function () {
    this.$store.dispatch('branch/branches')
    this.$store.dispatch('genre/genres')
    this.$store.dispatch('user/me')
  }
}
</script>
