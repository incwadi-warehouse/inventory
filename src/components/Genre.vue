<template>
  <section class="section section_fixed">
    <h1>Genres</h1>
    <ul class="list">
      <li v-for="genre in genres" :key="genre.id">{{genre.name}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'genre',
  computed: {
    genres: function () {
      return this.$store.state.genres
    }
  },
  mounted: function () {
    this.$store.dispatch('genres')
  }
}
</script>
