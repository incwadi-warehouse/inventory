<template>
  <section class="section section_fixed" v-if="counter">
    <p v-if="counter">Results: {{ counter }}</p>
    <hr>
    <div class="card">
      <div class="card_item" v-for="book in books" :key="book.id">
        <h2 class="card_title">
          {{book.title}}
        </h2>
        <div class="card_meta">
          {{book.genre.name}} - {{book.author}} - {{formatDate(book.added)}}
        </div>
        <p class="card_text alignRight">
          {{formatPrice(book.price)}} {{currency}}
        </p>
        <ul class="card_options">
          <li class="card_option">
            <router-link :to="{ name: 'edit', params: { id: book.id } }">Edit</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="alignCenter">
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
