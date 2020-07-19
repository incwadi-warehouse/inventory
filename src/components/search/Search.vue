<template>
  <b-container size="m">
    <b-search
      :placeholder="$t('search_for_title_or_author')"
      :button="$t('search')"
      @input="search"
      @submit.prevent="search"
      v-model="searchTerm"
    />
  </b-container>
</template>

<script>
export default {
  name: 'search',
  computed: {
    searchTerm: {
      get: function () {
        return this.$store.state.search.searchTerm
      },
      set: function (searchTerm) {
        this.$store.commit('search/searchTerm', searchTerm)
      },
    },
  },
  methods: {
    search: function () {
      this.$store.dispatch('search/search')
    },
  },
}
</script>
