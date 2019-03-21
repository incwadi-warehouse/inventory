export default {
  // Books
  books (state, books) {
    state.books = books
  },
  book (state, book) {
    state.book = book
  },
  // Genres
  genres (state, genres) {
    state.genres = genres
  },
  genre (state, genre) {
    state.genre = genre
  },
  // Branches
  branches (state, branches) {
    state.branches = branches
  },
  // User
  me (state, me) {
    state.me = me
  },
  // Filter
  searchTerm (state, searchTerm) {
    state.searchTerm = searchTerm
  },
  offset (state, offset) {
    state.offset = offset
  },
  stocked (state, stocked) {
    state.stocked = stocked
  },
  added (state, added) {
    state.added = added
  },
  branch (state, branch) {
    state.branch = branch
  },
  genreFilter (state, genre) {
    state.genreFilter = genre
  },
  lending (state, lending) {
    state.lending = lending
  },
  sort (state, sort) {
    state.sort = sort
  },
  // Spinner
  isLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}
