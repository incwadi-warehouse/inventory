<template>
  <section class="section section_fixed">
    <h1>{{ $t('genres') }}</h1>
    <ul class="list">
      <li v-for="genre in genres" :key="genre.id">
        {{genre.name}} <button class="btn btn_link" @click="remove(genre.id)" v-if="isAdmin">{{ $t('remove') }}</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'genre',
  computed: {
    genres: function () {
      return this.$store.state.genre.genres
    },
    isAdmin: function () {
      if (!this.$store.state.user.me) return
      return this.$store.state.user.me.roles.indexOf('ROLE_ADMIN') !== -1
    }
  },
  methods: {
    remove: function (id) {
      this.$store.dispatch('genre/removeGenre', id)
    }
  },
  mounted: function () {
    this.$store.dispatch('genre/genres')
  }
}
</script>
