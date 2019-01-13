<template>
  <section class="section section_default">
    <h1>{{book.title}}</h1>
    <p>{{book.author}}</p>
    <p>{{book.genre}}</p>
    <p class="big">{{this.price(book.price)}} EUR</p>
    <p v-if="book.stocked">In Stock</p>
    <p v-if="!book.stocked">Out of Stock</p>
    <p>Added on {{formatDate(book.added)}}</p>
  </section>
</template>

<script>
export default {
  name: 'detail',
  props: ['id'],
  computed: {
    book: function () {
      return this.$store.state.book
    }
  },
  methods: {
    price: function (price) {
      return Number.parseFloat(price).toFixed(2)
    },
    formatDate: function (timestamp) {
      let date = new Date(timestamp * 1000)

      return date.toLocaleDateString()
    }
  },
  mounted: function () {
    this.$store.dispatch('book', this.id)
  }
}
</script>
