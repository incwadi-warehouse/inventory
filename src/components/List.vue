<template>
  <section class="section section_fixed" v-if="counter">
    <p class="noprint" v-if="counter">Results: {{ counter }}</p>

    <div class="table_wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Added</th>
            <th class="alignRight">{{currency}}</th>
            <th class="noprint"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{book.title}}</td>
            <td>{{book.author}}</td>
            <td>{{book.genre.name}}</td>
            <td>{{formatDate(book.added)}}</td>
            <td class="alignRight">{{formatPrice(book.price)}}</td>
            <td class="alignRight noprint"><router-link :to="{ name: 'edit', params: { id: book.id } }">Edit</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="alignCenter noprint">
      <button class="btn btn_secondary" @click="reload" v-if="counter > 10">
        Load more
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      currency: process.env.CURRENCY
    }
  },
  computed: {
    books: function () {
      return this.$store.state.books.books
    },
    counter: function () {
      return this.$store.state.books.counter
    }
  },
  methods: {
    formatDate: function (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString()
    },
    formatPrice: function (price) {
      return Number.parseFloat(price).toFixed(2)
    },
    reload: function () {
      this.$store.commit(
        'offset',
        this.$store.state.offset + this.$store.state.limit
      )
      this.$store.dispatch('search')
    }
  }
}
</script>

<style>
@media print {
  .header,
  .search,
  .noprint {
    display: none;
  }
}
</style>
