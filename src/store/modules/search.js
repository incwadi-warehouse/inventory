import api from '../../api'

export default {
  namespaced: true,
  state: {
    books: [],
    counter: 0,
    authors: null,
    isLoading: false,
    tab: null,
    // Filter
    searchTerm: null,
    offset: 0,
    limit: 20,
    sold: false,
    removed: false,
    added: null,
    branch: null,
    genre: null,
    lending: null,
    orderBy: null,
    releaseYear: null,
    type: null
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
    isLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    tab(state, tab) {
      state.tab = tab
    },
    // Filter
    searchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    offset(state, offset) {
      state.offset = offset
    },
    sold(state, sold) {
      state.sold = sold === 1
    },
    removed(state, removed) {
      state.removed = removed === 1
    },
    added(state, added) {
      state.added = added
    },
    branch(state, branch) {
      state.branch = branch
    },
    genre(state, genre) {
      state.genre = genre
    },
    lending(state, lending) {
      state.lending = lending
    },
    orderBy(state, orderBy) {
      state.orderBy = orderBy
    },
    limit(state, limit) {
      state.limit = limit
    },
    releaseYear(state, releaseYear) {
      state.releaseYear = releaseYear
    },
    type(state, type) {
      state.type = type
    }
  },
  actions: {
    search(context, reload) {
      const isReleaseYearInRange =
        context.state.releaseYear === null ||
        (context.state.releaseYear >= 1000 && context.state.releaseYear <= 9999)
      if (!isReleaseYearInRange) return

      context.commit('isLoading', true)

      let added = null
      if (context.state.added) {
        added = new Date()
        added.setMonth(added.getMonth() - context.state.added)
        added =
          context.state.added !== 0 ? Math.round(added.getTime() / 1000) : null
      }

      let branch = null
      if (context.state.branch) {
        branch =
          context.state.branch.length >= 1
            ? context.state.branch.join(',')
            : null
      }

      let genre = null
      if (context.state.genre) {
        genre =
          context.state.genre.length >= 1 ? context.state.genre.join(',') : null
      }

      let lending = null
      if (context.state.lending) {
        lending = new Date()
        lending.setMonth(lending.getMonth() - context.state.lending)
        lending =
          context.state.lending !== 0
            ? Math.round(lending.getTime() / 1000)
            : null
      }

      api(context.rootState.user.token)
        .get('/v1/book/find', {
          params: {
            term: context.state.searchTerm,
            limit: context.state.limit,
            offset: context.state.offset,
            sold: context.state.sold ? '1' : '0',
            removed: context.state.removed ? '1' : '0',
            added: added,
            branch: branch,
            genre: genre,
            lending: lending,
            orderBy: context.state.orderBy,
            releaseYear: context.state.releaseYear,
            type: context.state.type
          }
        })
        .then(function(response) {
          if (context.state.offset >= 1) {
            response.data.books.forEach(book => {
              context.commit('addBook', book)
            })
          } else {
            context.commit('books', response.data.books)
            context.commit('counter', response.data.counter)
            if (reload) {
              context.commit('filter/offset', context.state.books.length, {
                root: true
              })
            }
          }
          context.commit('isLoading', false)
          context.dispatch('authors', null)
        })
    },
    authors(context) {
      if (!context.state.searchTerm) return

      api(context.rootState.user.token)
        .get('/v1/author/find', {
          params: {
            term: context.state.searchTerm
          }
        })
        .then(function(response) {
          context.commit('authors', response.data.authors)
        })
    },
    remove(context, id) {
      context.commit('removeAuthor', id)
      context.dispatch('author/remove', id, { root: true })
    },
    // Filter
    reset(context) {
      context.commit('searchTerm', null)
      context.commit('offset', 0)
      context.commit('sold', false)
      context.commit('removed', false)
      context.commit('added', null)
      context.commit('branch', null)
      context.commit('genre', null)
      context.commit('lending', null)
      context.commit('orderBy', null)
      context.commit('limit', 20)
      context.commit('releaseYear', null)
      context.commit('type', null)
    }
  }
}
