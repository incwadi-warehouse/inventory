<template>
  <article class="noprint">
    <b-container size="l">
      <b-actionbar>
        <template #input>
          <b-search
            :placeholder="$t('search_in_title_author_tags')"
            :button="$t('search')"
            icon
            filter
            @input="change"
            @submit.prevent="search"
            @filter="showFilter = !showFilter"
            @reset="reset"
            v-model="term"
          />
        </template>

        <template #actions>
          <b-button
            design="outline"
            ripple
            @click="$router.push({ name: 'book.new' })"
          >
            {{ $t('catalog') }}
          </b-button>
        </template>
      </b-actionbar>
    </b-container>

    <search-filter
      @close="showFilter = false"
      v-if="showFilter && !classicFilters"
    />
    <search-filters
      @close="showFilter = false"
      v-if="showFilter && classicFilters === 'true'"
    />
  </article>
</template>

<script>
import SearchFilter from './Filter'
import SearchFilters from './Filters'

export default {
  name: 'search-search',
  components: {
    SearchFilter,
    SearchFilters,
  },
  data() {
    return {
      showFilter: false,
    }
  },
  computed: {
    term: {
      get: function () {
        return this.$store.state.search.term
      },
      set: function (term) {
        this.$store.commit('search/term', term)
      },
    },
    classicFilters() {
      return window.localStorage.getItem('classicFilters')
    },
  },
  methods: {
    search() {
      this.$store.dispatch('book/find')
    },
    reset() {
      this.$store.commit('book/books', [])
      this.$store.commit('author/authors', null)
    },
    change() {
      if (this.term !== null) {
        this.$store.dispatch('book/find')
      }
    },
  },
}
</script>
