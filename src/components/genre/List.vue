<template>
  <section class="container container_m">
    <h1>{{ $t('genres') }}</h1>

    <div class="card">
      <div class="card_item" v-for="genre in genres" :key="genre.id">
        <ul class="card_options" v-if="isAdmin">
          <li class="card_option">
            <button class="card_option_btn" :title="$t('remove')" @click="remove(genre.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" class="icon">
                <path d="M11.2 2v8H2v6h46v-6h-7.36V2zm3.68 4h22.08v4H14.88zM7.52 18v30h34.96V18z"/>
              </svg>
            </button>
          </li>
        </ul>
        <div class="card_text">
          {{genre.name}}
        </div>
      </div>
    </div>
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
  created: function () {
    this.$store.dispatch('genre/genres')
  }
}
</script>
