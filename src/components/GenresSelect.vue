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
      return this.$store.state.genres
    },
    genre: {
      get: function () {
        return this.$store.state.genre ? this.$store.state.genre : null
      },
      set: function (value) {
        this.$store.commit('genre', value)
      }
    }
  },
  mounted: function () {
    this.$store.dispatch('genres')
  }
}
</script>
