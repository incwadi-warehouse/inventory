<template>
  <article>
    <search-actionbar class="noprint" />

    <b-container size="l" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <div class="noprint" v-if="hasBooks">
      <search-book-heading />
    </div>

    <b-container size="l" v-if="hasBooks">
      <b-table>
        <table>
          <search-books-table-head />
          <search-books-table-body />
        </table>
      </b-table>
    </b-container>

    <b-container size="l" v-if="hasAuthors">
      <h2>{{ $t('authors') }}</h2>
    </b-container>

    <search-author-list v-if="hasAuthors" />

    <search-scroll-to-top v-if="hasBooks" />
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchAuthorList from '../components/search/AuthorList'
import SearchScrollToTop from '../components/search/ScrollToTop'
import SearchBookHeading from '../components/search/BookHeading'
import SearchBooksTableHead from '../components/search/BooksTableHead'
import SearchBooksTableBody from '../components/search/BooksTableBody'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchActionbar,
    SearchAuthorList,
    SearchScrollToTop,
    SearchBookHeading,
    SearchBooksTableHead,
    SearchBooksTableBody,
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
}
</script>