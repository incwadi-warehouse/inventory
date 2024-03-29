<template>
  <article>
    <b-container size="l" v-if="is404">
      <b-notification type="warning" hidable>
        {{ $t('notFoundDesc') }}
      </b-notification>
    </b-container>

    <b-container
      size="l"
      v-if="
        reservation.state.reservations &&
        reservation.state.reservations.length >= 1
      "
    >
      <b-notification type="success">
        <router-link :to="{ name: 'reservation' }">
          {{ $t('current_reservations') }}:
          {{ reservation.state.reservations.length }}
        </router-link>
      </b-notification>
    </b-container>

    <search-actionbar class="noprint" :me="me" />

    <b-container size="l" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="l" v-if="cart.state.cart">
      <h2>{{ $t('cart') }} ({{ cart.state.cart.length }})</h2>

      <ul>
        <li v-for="book in cart.state.cart" :key="book.id">
          <router-link :to="{ name: 'book', params: { bookId: book.id } }">
            {{ book.title }}
          </router-link>
          <span @click="cart.remove(book)"
            ><b-icon type="close" :size="15"
          /></span>
        </li>
      </ul>

      <b-button type="button" design="text" @click="cart.clean">
        {{ $t('cleanCart') }}
      </b-button>
      <b-button
        type="button"
        design="text"
        @click="$router.push({ name: 'reservation' })"
      >
        {{ $t('reservate') }}
      </b-button>
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
          @add-to-cart="cart.add($event)"
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
      :me="me"
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
import { onUnmounted, ref, toRefs } from '@vue/composition-api'
import useInventory from '@/composables/useInventory'
import useReservation from '@/composables/useReservation'
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

    const cart = useCart()

    let inventoryMode = ref(false)
    const { state: stateInventory } = useInventory()

    const showConfirm = ref(false)

    const reservation = useReservation()
    reservation.list()
    const reservationInterval = window.setInterval(() => {
      reservation.list()
    }, 5000)

    onUnmounted(() => {
      window.clearInterval(reservationInterval)
    })

    return {
      showCovers,
      cart,
      me,
      stateInventory,
      inventoryMode,
      showConfirm,
      reservation,
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
