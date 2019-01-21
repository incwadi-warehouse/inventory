<template>
    <section class="section section_default" v-if="counter">
      <div class="table_wrapper">
        <table class="table">
          <thead>
            <th>Genre</th>
            <th>Title</th>
            <th>Author</th>
            <th>Added</th>
            <th>Price</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{book.genre}}</td>
              <td><router-link :to="{ name: 'detail', params: { id: book.id } }">{{book.title}}</router-link></td>
              <td>{{book.author}}</td>
              <td>{{formatDate(book.added)}}</td>
              <td>{{formatPrice(book.price)}} {{book.currency}}</td>
              <td><router-link :to="{ name: 'edit', params: { id: book.id } }">&#9998;</router-link></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="alignCenter">
        <button class="btn btn_secondary" @click="reload" v-if="counter> 10">Load more</button>
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
