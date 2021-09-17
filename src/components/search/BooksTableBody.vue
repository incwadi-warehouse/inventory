<template>
  <tbody>
    <tr v-for="book in books" :key="book.id">
      <td v-if="covers">
        <img :src="image(book.id)" width="100" alt="Cover" />
      </td>
      <td @click="edit(book.id)" :style="{ cursor: 'pointer' }">
        {{ book.title }}
      </td>
      <td v-if="book.author">
        {{ formatAuthor(book.author) }}
      </td>
      <td v-else></td>
      <td>
        {{ book.genre.name }}
      </td>
      <td v-if="sold == false && removed == false">
        {{ formatDate(book.added) }}
      </td>
      <td v-if="sold == true">
        {{ formatDate(book.soldOn) }}
      </td>
      <td v-if="removed == true">
        {{ formatDate(book.removedOn) }}
      </td>
      <td>
        {{ book.format ? book.format.name : null }}
      </td>
      <td style="text-align: right">
        {{ book.releaseYear }}
      </td>
      <td style="text-align: right">
        {{ formatPrice(book.price) }}
      </td>
      <td class="noprint" style="cursor: pointer">
        <context-menu
          :book="book"
          @add-to-cart="$emit('add-to-cart', $event)"
        />
      </td>
      <td class="noprint" :style="{ textAlign: 'right' }" v-if="inventoryMode">
        <b-button design="text" @click.prevent="bookFound(book.id)">
          <b-icon type="done" :isPrimary="book.inventory" />
        </b-button>
        <b-button design="text" @click.prevent="bookNotFound(book.id)">
          <b-icon type="close" :isPrimary="false === book.inventory" />
        </b-button>
      </td>
    </tr>
  </tbody>
</template>

<script>
import ContextMenu from './ContextMenu'
import { mapState } from 'vuex'

export default {
  name: 'books-list-search',
  components: {
    ContextMenu,
  },
  props: {
    covers: {
      type: Boolean,
      default: false,
    },
    inventoryMode: Boolean,
    me: Object,
  },
  computed: {
    ...mapState('search', ['sold', 'removed']),
    ...mapState('book', ['books']),
  },
  methods: {
    edit(id) {
      this.$router.push({ name: 'book', params: { bookId: id } })
    },
    image(id) {
      return (
        process.env.VUE_APP_API +
        '/api/public/book/cover/' +
        id +
        '_100x100.jpg'
      )
    },
    bookFound(id) {
      this.$store.dispatch('book/bookFound', { me: this.me, id })
    },
    bookNotFound(id) {
      this.$store.dispatch('book/bookNotFound', { me: this.me, id })
    },
    formatDate(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString()
    },
    formatPrice(price) {
      return Number.parseFloat(price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
    formatAuthor(author) {
      if (author.firstname === '') {
        return author.surname
      }
      return author.surname + ', ' + author.firstname
    },
  },
}
</script>

<style scoped>
td:first-child {
  position: sticky;
  left: 20px;
  z-index: 1;
  background: var(--color-neutral-00);
}
</style>
