<template>
  <tbody>
    <tr v-for="book in books" :key="book.id">
      <td v-if="covers">
        <img
          :src="
            'http://localhost:8000/api/public/book/cover/' +
            book.id +
            '_100x100.jpg'
          "
          width="100"
        />
      </td>
      <td @click="edit(book.id)" :style="{ cursor: 'pointer' }">
        <span v-show="book.lendTo">[{{ $t('lend') }}] </span>
        {{ book.title }}
      </td>
      <td v-if="book.author">
        {{ book.author | formatAuthor }}
      </td>
      <td v-else></td>
      <td>
        {{ book.genre.name }}
      </td>
      <td v-if="sold == false && removed == false">
        {{ book.added | formatDate }}
      </td>
      <td v-if="sold == true">
        {{ book.soldOn | formatDate }}
      </td>
      <td v-if="removed == true">
        {{ book.removedOn | formatDate }}
      </td>
      <td>
        {{ $t(book.type) }}
      </td>
      <td style="text-align: right">
        {{ book.releaseYear }}
      </td>
      <td style="text-align: right">
        {{ book.price | formatPrice }}
      </td>
      <td class="noprint" style="cursor: pointer">
        <context-menu :book="book" @cart="$emit('cart')" />
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
  },
  computed: {
    ...mapState('search', ['sold', 'removed']),
    ...mapState('book', ['books']),
  },
  methods: {
    edit(id) {
      this.$router.push({ name: 'book', params: { bookId: id } })
    },
  },
  filters: {
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
