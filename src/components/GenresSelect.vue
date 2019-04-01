<template>
  <select id="genre" class="form_input" v-model="genre">
    <option v-for="genre in genres" :key="genre.id" :value="genre.id">
      {{genre.name}}
    </option>
  </select>
</template>

<script>
export default {
  name: 'genres-select',
  computed: {
    genres: function () {
      return this.$store.state.genres.genres
    },
    genre: {
      get: function () {
        return this.$store.state.genres.genre ? this.$store.state.genres.genre : null
      },
      set: function (value) {
        this.$store.commit('genres/genre', value)
      }
    }
  },
  mounted: function () {
    this.$store.dispatch('genres/genres')
  }
}
</script>
