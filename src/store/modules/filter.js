export default {
  namespaced: true,
  state: {
    searchTerm: null,
    offset: 0,
    limit: 20,
    stocked: 1,
    added: null,
    branch: null,
    genreFilter: null,
    lending: null,
    orderBy: null,
    releaseYear: null,
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
    orderBy (state, orderBy) {
      state.orderBy = orderBy
    },
    limit (state, limit) {
      state.limit = limit
    },
    releaseYear (state, releaseYear) {
      state.releaseYear = releaseYear
    },
    type (state, type) {
      state.type = type
    }
  },
  actions: {
    reset (context) {
      context.commit('searchTerm', null)
      context.commit('offset', 0)
      context.commit('limit', 20)
      context.commit('stocked', 1)
      context.commit('added', null)
      context.commit('branch', null)
      context.commit('genreFilter', null)
      context.commit('lending', null)
      context.commit('orderBy', null)
      context.commit('releaseYear', null)
      context.commit('type', null)
    }
  }
}
