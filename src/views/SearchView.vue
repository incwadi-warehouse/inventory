<template>
  <article>
    <search class="noprint" />

    <b-container size="m" class="noprint" style="text-align: right;">
      <b-button design="outline" @click="setTab('filter')">
        {{ $t('filter') }}
      </b-button>
      <b-button design="outline" @click="setTab('create')">
        {{ $t('catalog') }}
      </b-button>
    </b-container>

    <filters class="noprint" v-if="tab === 'filter'" />
    <create class="noprint" v-if="tab === 'create'" />

    <b-container size="m" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <list />
    <author-list />

    <scroll-to-top v-if="counter" />
  </article>
</template>

<script>
import Search from '../components/search/Search'
import Filters from '../components/search/Filters'
import List from '../components/search/List'
import AuthorList from '../components/search/AuthorList'
import Create from '../components/book/Create'
import ScrollToTop from '../components/search/ScrollToTop'
import { mapState } from 'vuex'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    Search,
    Filters,
    List,
    AuthorList,
    Create,
    ScrollToTop,
  },
  computed: {
    isLoading: function () {
      return this.$store.state.search.isLoading
    },
    tab: function () {
      return this.$store.state.search.tab
    },
    ...mapState('search', ['counter']),
  },
  methods: {
    setTab: function (tab) {
      if (tab === this.$store.state.search.tab) {
        this.$store.commit('search/tab', null)
        return
      }
      this.$store.commit('search/tab', tab)
    },
  },
}
</script>
