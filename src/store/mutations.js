export default {
  books (state, books) {
    state.books = books
  },
  book (state, book) {
    state.book = book
  },
  searchTerm (state, searchTerm) {
    state.searchTerm = searchTerm
  },
  offset (state, offset) {
    state.offset = offset
  },
  genres (state, genres) {
    state.genres = genres
  },
  genre (state, genre) {
    state.genre = genre
  },
  branches (state, branches) {
    state.branches = branches
  },
  me (state, me) {
    state.me = me
  },
  isLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}
