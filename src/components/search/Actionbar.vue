<template>
  <article class="noprint">
    <b-container size="l">
      <b-actionbar>
        <template #input>
          <b-search
            :placeholder="$t('search_in_title_author_genre_tags')"
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

    <search-filters
      @close="showFilter = false"
      v-if="showFilter && !flexFilters"
      :me="me"
    />
    <search-filter
      @close="showFilter = false"
      v-if="showFilter && flexFilters === 'true'"
    />
  </article>
</template>

<script>
import SearchFilter from './Filter'
import SearchFilters from './Filters'
import _debounce from 'lodash/debounce'

export default {
  name: 'search-search',
  components: {
    SearchFilter,
    SearchFilters,
  },
  props: {
    me: Object,
  },
  data() {
    return {
      showFilter: false,
      changeRequest: null,
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
    flexFilters() {
      return window.localStorage.getItem('flexFilters')
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
      if (null !== this.changeRequest) {
        this.changeRequest.cancel()
      }
      this.changeRequest = _debounce(() => {
        if (this.term !== null) {
          this.$store.dispatch('book/find')
        }
      }, 500)
      this.changeRequest()
    },
  },
}
</script>
