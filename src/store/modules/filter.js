export default {
  namespaced: true,
  state: {
    searchTerm: null,
    offset: 0,
    limit: 20,
    stocked: null,
    added: null,
    branch: null,
    genreFilter: null,
    lending: null,
    sort: null,
    yearOfPublication: null,
    type: null
  },
  mutations: {
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
    limit (state, limit) {
      state.limit = limit
    },
    yearOfPublication (state, yearOfPublication) {
      state.yearOfPublication = yearOfPublication
    },
    type (state, type) {
      state.type = type
    }
  },
  actions: {}
}
