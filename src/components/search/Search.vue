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
        <button type="reset" class="search_btn search_btn_reset">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" class="icon">
            <path
              d="M44.987 9.643l-15.35 15.349 15.35 15.35-4.685 4.684-15.349-15.35-15.35 15.35-4.629-4.63 15.35-15.349-15.35-15.35L9.66 5.014l15.35 15.35 15.348-15.35z" />
          </svg>
        </button>
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
