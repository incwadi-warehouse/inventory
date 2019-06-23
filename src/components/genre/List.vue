<template>
  <section class="section section_fixed">
    <h1>{{ $t('genres') }}</h1>
    <ul class="list">
      <li v-for="genre in genres" :key="genre.id">
        {{genre.name}} <button class="btn btn_link" @click="remove(genre.id)">{{ $t('remove') }}</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'genre',
  computed: {
    genres: function () {
      return this.$store.state.genres.genres
    }
  },
  methods: {
    remove: function (id) {
      this.$store.dispatch('genres/removeGenre', id)
    }
  },
  mounted: function () {
    this.$store.dispatch('genres/genres')
  }
}
</script>
