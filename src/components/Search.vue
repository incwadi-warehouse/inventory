<template>
  <section class="section section_default">
    <form class="form" @submit.prevent>
      <div class="form_group">
        <div class="form_item">
          <label for="searchTerm" class="form_label visuallyHidden">
            Search
          </label>
        </div>
        <div class="form_item">
          <input
            type="search"
            id="searchTerm"
            class="form_input search"
            placeholder="Search for title or author"
            autofocus
            v-model="searchTerm">
        </div>
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
  }
}
</script>

<style>
.search {
  font-size: 26px;
}
</style>
