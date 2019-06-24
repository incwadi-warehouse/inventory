<template>
  <section class="section section_default">
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
          <input type="number" id="added" class="form_input" min="0" v-model="added">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="lending" class="form_label">{{ $t('lend_more_then_x_months') }}</label>
        </div>
        <div class="form_item">
          <input type="number" id="lending" class="form_input" min="0" v-model="lending">
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
          <input type="checkbox" id="stocked" v-model="stocked">
          <label for="stocked">{{ $t('stocked') }}</label>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="yearOfPublication" class="form_label">{{ $t('release_year') }}</label>
        </div>
        <div class="form_item">
          <input type="number" id="yearOfPublication" class="form_input" v-model="yearOfPublication">
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
      return this.$store.state.branches.branches
    },
    genres: function () {
      return this.$store.state.genres.genres
    },
    stocked: {
      get: function () {
        return this.$store.state.filter.stocked || true
      },
      set: function (stocked) {
        this.$store.commit('filter/stocked', stocked ? 1 : 0)
      }
    },
    added: {
      get: function () {
        return this.$store.state.filter.added || 0
      },
      set: function (added) {
        this.$store.commit('filter/added', added)
      }
    },
    branch: {
      get: function () {
        return this.$store.state.filter.branch || (this.$store.state.me ? [this.$store.state.me.branch.id] : [])
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
  mounted: function () {
    this.$store.dispatch('branches/branches')
    this.$store.dispatch('genres/genres')
  }
}
</script>
