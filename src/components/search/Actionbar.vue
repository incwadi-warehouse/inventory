<template>
  <article>
    <b-container size="m">
      <b-search
        :placeholder="$t('search_for_title_or_author')"
        :button="$t('search')"
        @input="search"
        @submit.prevent="search"
        v-model="term"
      />
    </b-container>

    <b-container size="m" align="right" class="noprint">
      <b-button design="outline" @click="showFilter = true">
        {{ $t('filter') }}
      </b-button>
      <b-button design="outline" @click="showCreate = true">
        {{ $t('catalog') }}
      </b-button>
    </b-container>

    <search-filter
      class="noprint"
      @close="showFilter = false"
      v-if="showFilter"
    />
    <book-create
      class="noprint"
      @close="showCreate = false"
      v-if="showCreate"
    />
  </article>
</template>

<script>
import SearchFilter from './Filter'
import BookCreate from './../book/Create'

export default {
  name: 'search-search',
  components: {
    SearchFilter,
    BookCreate,
  },
  data() {
    return {
      showFilter: false,
      showCreate: false,
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
  },
  methods: {
    search() {
      this.$store.dispatch('book/find')
    },
  },
}
</script>
