<template>
  <span>
    <button class="btn btn_link" @click="toggleContextMenu">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25.000001 25.000001">
        <path d="M10 2h5v5h-5zm0 16h5v5h-5zm0-8h5v5h-5z" class="icon"/>
      </svg>
    </button>
    <ul class="contextMenu" :style="style" v-if="showContextMenu" @mouseleave="closeContextMenu">
      <li class="contextMenu_item">
        <router-link :to="{ name: 'edit', params: { id: book.id } }">
          {{ $t('edit') }}
        </router-link>
      </li>
      <li class="contextMenu_item">
        <button class="btn btn_link" @click="toggleStocking(book)" v-if="book.stocked">
          {{ $t('sold') }}
        </button>
      </li>
      <li class="contextMenu_item">
        <button class="btn btn_link" @click="closeContextMenu">
          {{ $t('close') }}
        </button>
      </li>
    </ul>
  </span>
</template>

<script>
export default {
  name: 'contextMenu',
  props: ['book'],
  data () {
    return {
      showContextMenu: false,
      style: {}
    }
  },
  computed: {
    books: function () {
      return this.$store.state.books.books
    }
  },
  methods: {
    toggleContextMenu: function (event) {
      this.showContextMenu = !this.showContextMenu
      this.style = {
        display: 'block',
        top: event.clientY + 'px',
        left: (event.clientX - 200) + 'px'
      }
    },
    closeContextMenu: function (event) {
      this.showContextMenu = false
    },
    toggleStocking: function (book) {
      let books = this.books
      let id = books.indexOf(book)
      books.splice(id, 1)
      this.$store.commit('books/books', books)
      this.$store.commit('filter/offset', this.$store.state.filter.offset - 1)
      this.$store.dispatch('books/toggleStocking', book.id)
    }
  }
}
</script>

<style>
.icon {
  fill: var(--color-fontDark);
}
</style>
