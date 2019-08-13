<template>
  <section class="container container_m">
    <form class="search" @submit.prevent="search">
      <div class="search_main">
        <input
          type="search"
          id="searchTerm"
          class="search_input"
          :placeholder="$t('search_for_title_or_author')"
          :aria-label="$t('search')"
          autofocus
          @input="search"
          v-model="searchTerm">
      </div>
      <div class="search_options">
        <button class="search_btn" @click.prevent="search">
          {{ $t('search') }}
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'search',
  computed: {
    searchTerm: {
      get: function () {
        return this.$store.state.filter.searchTerm
      },
      set: function (searchTerm) {
        this.$store.commit('filter/searchTerm', searchTerm)
      }
    }
  },
  methods: {
    search: function () {
      this.$store.dispatch('book/search')
      this.$store.commit('filter/offset', 0)
    }
  },
  mounted: function () {
    document.getElementById('searchTerm').focus()
  }
}
</script>
