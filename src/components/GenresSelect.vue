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
  props: ['genre'],
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
