<template>
  <section class="section section_fixed">
    <form class="search" @submit.prevent="search">
      <div class="search_main">
        <label for="searchTerm" class="form_label visuallyHidden">
          Search
        </label>
        <input
          type="search"
          id="searchTerm"
          class="search_input"
          placeholder="Search for title or author"
          autofocus
          v-model="searchTerm">
      </div>
      <div class="search_options">
        <button class="btn btn_branded search_btn" @click.prevent="search">Find</button>
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
        return this.$store.state.searchTerm
      },
      set: function (searchTerm) {
        this.$store.commit('searchTerm', searchTerm)
      }
    }
  },
  methods: {
    search: function () {
      this.$store.dispatch('search')
    }
  }
}
</script>

<style>
.search {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid var(--color-brand);
  border-radius: 5px;
  overflow: auto;
}
.search_main {
  flex-grow: 1;
}
.search_options {
  padding: 0;
  width: 100%;
}
.search_input {
  border: 0 hidden;
  width: 100%;
  font-size: 26px;
}
.search_btn {
  border-radius: 0;
  width: 100%;
}
@media all and (min-width: 500px) {
  .search_options {
    width: auto;
  }
}
</style>
