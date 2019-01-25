<template>
  <section class="section section_default" v-if="counter">
    <div class="card">
      <div class="card_item" v-for="book in books" :key="book.id">
        <h2 class="card_title">
          <a href="/">{{book.title}}</a>
        </h2>
        <div class="card_meta">
          {{book.genre}} - {{book.author}} - {{formatDate(book.added)}}
        </div>
        <p class="card_text alignRight">
          {{formatPrice(book.price)}} {{book.currency}}
        </p>
        <ul class="card_options">
          <li class="card_option">
            <router-link :to="{ name: 'edit', params: { id: book.id } }">&#9998;</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="alignCenter">
      <button class="btn btn_secondary" @click="reload" v-if="counter> 10">
        Load more
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'list',
  computed: {
    books: function () {
      return this.$store.state.books
    },
    counter: function () {
      return this.$store.state.books.length
    }
  },
  methods: {
    formatDate: function (timestamp) {
      let date = new Date(timestamp * 1000)

      return date.toLocaleDateString()
    },
    formatPrice: function (price) {
      return Number.parseFloat(price).toFixed(2)
    },
    reload: function () {
      this.$store.commit('offset', this.$store.state.offset + 20)
      this.$store.dispatch('search', {
        term: this.$store.state.searchTerm,
        offset: this.$store.state.offset
      })
    }
  },
  watch: {
    '$store.state.searchTerm': function () {
      if (this.$store.state.searchTerm === '') {
        return this.$store.commit('books', [])
      }

      this.$store.dispatch('search', {
        term: this.$store.state.searchTerm,
        offset: this.$store.state.offset
      })
    }
  }
}
</script>
