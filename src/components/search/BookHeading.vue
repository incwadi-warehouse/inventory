<template>
  <b-container size="l" v-if="hasBooks">
    <div class="search-head">
      <div class="search-head_title">
        <h2>{{ $t('books') }}</h2>
        <span v-if="counter >= 2 && counter !== books.length">
          {{
            $t('show_x_of_y_found_books', {
              show: books.length,
              found: counter,
            })
          }}
        </span>
        <span v-if="counter >= 2 && counter === books.length">
          {{
            $t('show_x_found_books', {
              found: counter,
            })
          }}
        </span>
        <span v-if="counter === 1 && counter === books.length">
          {{ $t('show_1_found_book') }}
        </span>
      </div>
      <div class="search-head_actions">
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
  props: {
    me: Object,
  },
  computed: {
    ...mapState('book', ['books']),
    counter() {
      return this.$store.state.book.counter
    },
    hasBooks() {
      return this.$store.state.book.counter >= 1
    },
  },
  methods: {
    showAll() {
      this.$store.commit('search/limit', this.counter * 10)
      this.$store.dispatch('book/find', this.me)
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
