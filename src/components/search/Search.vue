<template>
  <b-container size="m">
    <b-search
      :placeholder="$t('search_for_title_or_author')"
      :button="$t('search')"
      v-model="searchTerm"
      @input="search"
      @submit.prevent="search"
    />
  </b-container>
</template>

<script>
export default {
  name: 'search',
  computed: {
    searchTerm: {
      get: function() {
        return this.$store.state.filter.searchTerm
      },
      set: function(searchTerm) {
        this.$store.commit('filter/searchTerm', searchTerm)
      }
    }
  },
  methods: {
    search: function() {
      this.$store.commit('filter/offset', 0)
      this.$store.dispatch('search/search')
    }
  }
}
</script>
