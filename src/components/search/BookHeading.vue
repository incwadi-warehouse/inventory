<template>
  <b-container size="m" v-if="hasBooks">
    <div class="search-head">
      <div class="search-head_title">
        <h2>{{ $t('books') }}</h2>
        <span>
          {{
            $t('show_x_of_y_found_books', {
              show: books.length,
              found: counter,
            })
          }}
        </span>
      </div>
      <div class="search-head_actions">
        <b-button design="text" ripple @click="toggleFluid">Fluid</b-button>
        <b-button design="text" ripple @click="showAll">{{
          $t('show_all')
        }}</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'book-counter-search',
  computed: {
    ...mapState('search', ['fluid']),
    ...mapState('book', ['books']),
    counter() {
      return this.$store.state.book.counter
    },
    hasBooks() {
      return this.$store.state.book.counter >= 1
    },
  },
  methods: {
    toggleFluid() {
      this.$store.dispatch('search/toggleFluid')
    },
    showAll() {
      this.$store.commit('search/limit', this.counter)
      this.$store.dispatch('book/find')
    },
  },
}
</script>

<style scoped>
.search-head {
  display: flex;
  align-items: center;
}
.search-head_title {
  flex-grow: 1;
}
.search-head_actions {
  text-align: right;
}
</style>
