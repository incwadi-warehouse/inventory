<template>
  <section class="section section_fixed">
    <h1>Genres</h1>
    <spinner/>
    <ul class="list">
      <li v-for="genre in genres" :key="genre.id">{{genre.name}}</li>
    </ul>
  </section>
</template>

<script>
import Spinner from './Spinner'

export default {
  name: 'genre',
  components: {
    Spinner
  },
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
