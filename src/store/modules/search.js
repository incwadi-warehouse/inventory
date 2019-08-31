import api from '../../api'

export default {
  namespaced: true,
  state: {
    books: [],
    counter: 0,
    isLoading: false,
    authors: null,
    tab: null
  },
  mutations: {
    books(state, books) {
      state.books = books
    },
    addBook(state, book) {
      state.books.push(book)
    },
    removeBook(state, book) {
      const id = state.books.indexOf(book)
      state.books.splice(id, 1)
    },
    counter(state, counter) {
      state.counter = counter
    },
    isLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    authors(state, authors) {
      state.authors = authors
    },
    removeAuthor(state, id) {
      const authors = state.authors.filter(author => author.id === id)
      authors.forEach(author => {
        const id = state.authors.indexOf(author)
        state.authors.splice(id, 1)
      })
    },
    tab(state, tab) {
      state.tab = tab
    }
  },
  actions: {
    search(context) {
      if (!context.rootState.filter.searchTerm) return
      const isReleaseYearInRange =
        context.rootState.filter.releaseYear === null ||
        (context.rootState.filter.releaseYear >= 1000 &&
          context.rootState.filter.releaseYear <= 9999)
      if (!isReleaseYearInRange) return

      context.commit('isLoading', true)

      let added = null
      if (context.rootState.filter.added) {
        added = new Date()
        added.setMonth(added.getMonth() - context.rootState.filter.added)
        added =
          context.rootState.filter.added !== 0
            ? Math.round(added.getTime() / 1000)
            : null
      }

      let branch = null
      if (context.rootState.filter.branch) {
        branch =
          context.rootState.filter.branch.length >= 1
            ? context.rootState.filter.branch.join(',')
            : null
      }

      let genre = null
      if (context.rootState.filter.genreFilter) {
        genre =
          context.rootState.filter.genreFilter.length >= 1
            ? context.rootState.filter.genreFilter.join(',')
            : null
      }

      let lending = null
      if (context.rootState.filter.lending) {
        lending = new Date()
        lending.setMonth(lending.getMonth() - context.rootState.filter.lending)
        lending =
          context.rootState.filter.lending !== 0
            ? Math.round(lending.getTime() / 1000)
            : null
      }

      api(context.rootState.user.token)
        .get('/v1/book/find', {
          params: {
            term: context.rootState.filter.searchTerm,
            limit: context.rootState.filter.limit,
            offset: context.rootState.filter.offset,
            sold: context.rootState.filter.sold ? '1' : '0',
            removed: context.rootState.filter.removed ? '1' : '0',
            added: added,
            branch: branch,
            genre: genre,
            lending: lending,
            orderBy: context.rootState.filter.orderBy,
            releaseYear: context.rootState.filter.releaseYear,
            type: context.rootState.filter.type
          }
        })
        .then(function(response) {
          if (context.rootState.filter.offset >= 1) {
            response.data.books.forEach(book => {
              context.commit('addBook', book)
            })
          } else {
            context.commit('books', response.data.books)
            context.commit('counter', response.data.counter)
            context.commit('filter/offset', context.state.books.length, {
              root: true
            })
          }
          context.commit('isLoading', false)
          context.dispatch('authors', null)
        })
    },
    authors(context) {
      if (!context.rootState.filter.searchTerm) return

      api(context.rootState.user.token)
        .get('/v1/author/find', {
          params: {
            term: context.rootState.filter.searchTerm
          }
        })
        .then(function(response) {
          context.commit('authors', response.data.authors)
        })
    },
    remove(context, id) {
      context.commit('removeAuthor', id)
      context.dispatch('author/remove', id, { root: true })
    }
  }
}
