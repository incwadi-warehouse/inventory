<template>
  <article>
    <search class="noprint" />

    <b-container size="m" class="noprint" style="text-align: right;">
      <b-button type="outline" @click="setTab('filter')">
        {{ $t('filter') }}
      </b-button>
      <b-button type="outline" @click="setTab('create')">
        {{ $t('catalog') }}
      </b-button>
    </b-container>

    <filters class="noprint" v-if="tab === 'filter'" />
    <b-container size="m" v-if="tab === 'limit'">
      <limit class="noprint" />
    </b-container>
    <create class="noprint" v-if="tab === 'create'" />

    <b-container size="m" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <list />
    <author-list />
  </article>
</template>

<script>
import Search from '../components/search/Search'
import Filters from '../components/search/Filters'
import List from '../components/search/List'
import AuthorList from '../components/search/AuthorList'
import Create from '../components/book/Create'
import Limit from '../components/search/Limit'

export default {
  name: 'search-view',
  components: {
    Search,
    Filters,
    List,
    AuthorList,
    Create,
    Limit
  },
  computed: {
    isLoading: function() {
      return this.$store.state.search.isLoading
    },
    tab: function() {
      return this.$store.state.search.tab
    }
  },
  methods: {
    setTab: function(tab) {
      if (tab === this.$store.state.search.tab) {
        this.$store.commit('search/tab', null)
        return
      }
      this.$store.commit('search/tab', tab)
    }
  }
}
</script>
