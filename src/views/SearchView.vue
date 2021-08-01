<template>
  <article>
    <b-container size="l" v-if="is404">
      <b-notification type="warning" hidable>
        {{ $t('notFoundDesc') }}
      </b-notification>
    </b-container>

    <search-actionbar class="noprint" :me="me" />

    <b-container size="l" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="l" v-if="cart">
      <b-notification type="success">
        {{
          $tc('articlesInCart', cart.length, {
            counter: cart.length,
          })
        }}
        <router-link :to="{ name: 'reservation' }">
          {{ $t('reservations') }}
        </router-link>
      </b-notification>
    </b-container>

    <div class="noprint" v-if="hasBooks">
      <search-book-heading :me="me" />
    </div>

    <b-container size="l" v-if="hasBooks">
      <div :style="{ textAlign: 'right' }">
        <b-button design="text" @click.prevent="showCovers = !showCovers">
          {{ $t('showCovers') }}
        </b-button>
        <b-button
          design="text"
          @click.prevent="inventoryMode = !inventoryMode"
          v-if="stateInventory.hasActiveInventory"
        >
          {{ $t('inventoryMode') }}
        </b-button>
      </div>
      <table>
        <search-books-table-head
          :me="me"
          :covers="showCovers"
          :inventoryMode="inventoryMode"
        />
        <search-books-table-body
          @cart="listCart()"
          :covers="showCovers"
          :inventoryMode="inventoryMode"
          :me="me"
        />
      </table>
    </b-container>

    <b-container size="l" v-if="hasAuthors">
      <h2>{{ $t('authors') }}</h2>
    </b-container>

    <search-author-list v-if="hasAuthors" />

    <search-scroll-to-top v-if="hasBooks" />

    <book-edit
      :book="$store.state.book.book"
      :me="me"
      v-if="$store.state.book.book"
      @close="closeEdit"
      @update-book="updateBook"
    />
    <book-create
      @close="confirmClose"
      @created="$router.push({ name: 'search' })"
      v-if="showCreateBook"
    />

    <confirm
      v-if="showConfirm"
      @confirm-yes="closeModal"
      @confirm-no="showConfirm = false"
    >
      {{ $t('closeModal') }}
    </confirm>
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchAuthorList from '../components/search/AuthorList'
import SearchScrollToTop from '../components/search/ScrollToTop'
import SearchBookHeading from '../components/search/BookHeading'
import SearchBooksTableHead from '../components/search/BooksTableHead'
import SearchBooksTableBody from '../components/search/BooksTableBody'
import BookCreate from '../components/book/Create'
import BookEdit from '../components/book/Edit'
import useCart from './../composables/useCart'
import useAuth from '@/composables/useAuth'
import { ref, toRefs } from '@vue/composition-api'
import useInventory from '@/composables/useInventory'
import Confirm from '@/components/Confirm'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  props: {
    bookId: {
      type: String,
      default: null,
    },
    showCreateBook: {
      type: Boolean,
      default: false,
    },
    is404: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SearchActionbar,
    SearchAuthorList,
    SearchScrollToTop,
    SearchBookHeading,
    SearchBooksTableHead,
    SearchBooksTableBody,
    BookCreate,
    BookEdit,
    Confirm,
  },
  setup() {
    let showCovers = ref(false)
    const { getUser, state } = useAuth()
    getUser()
    const { me } = toRefs(state)

    const { cart, listCart } = useCart()
    listCart()

    let inventoryMode = ref(false)
    const { state: stateInventory } = useInventory()

    const showConfirm = ref(false)

    return {
      showCovers,
      cart,
      listCart,
      me,
      stateInventory,
      inventoryMode,
      showConfirm,
    }
  },
  computed: {
    hasBooks() {
      if (!this.$store.state.book.books) return false
      return this.$store.state.book.books.length >= 1
    },
    hasAuthors() {
      if (!this.$store.state.author.authors) return false
      return this.$store.state.author.authors.length >= 1
    },
    isLoading() {
      return this.$store.state.search.isLoading
    },
  },
  methods: {
    getBook() {
      if (this.bookId) this.$store.dispatch('book/show', this.bookId)
    },
    closeEdit() {
      this.showConfirm = true
    },
    updateBook() {
      this.$store.commit('book/book', null)
      this.$router.push({ name: 'search' })
    },
    confirmClose() {
      this.showConfirm = true
    },
    closeModal() {
      this.showConfirm = false
      this.$store.commit('book/book', null)
      this.$router.push({ name: 'search' })
    },
  },
  watch: {
    bookId() {
      this.getBook()
    },
  },
  created() {
    this.$store.dispatch('genre/genres')
    this.getBook()
  },
}
</script>
