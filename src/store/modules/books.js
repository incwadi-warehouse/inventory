import api from '../../api'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    books: [],
    book: {
      title: null,
      author: null,
      genre: null,
      added: null,
      price: null,
      stocked: null
    },
    counter: 0,
    hasCreateError: false,
    hasUpdateError: false,
    isDuplicate: false
  },
  mutations: {
    books (state, books) {
      state.books = books
    },
    counter (state, counter) {
      state.counter = counter
    },
    book (state, book) {
      state.book = book
    },
    hasCreateError (state, status) {
      state.hasCreateError = status
    },
    hasUpdateError (state, status) {
      state.hasUpdateError = status
    },
    isDuplicate (state, status) {
      state.isDuplicate = status
    }
  },
  actions: {
    book (context, id) {
      context.commit('isLoading', true, { root: true })
      api(context.rootState.user.token)
        .get('/v1/book/' + id)
        .then(function (response) {
          context.commit('book', response.data)
          context.commit('isLoading', false, { root: true })
        })
    },
    search (context) {
      context.commit('isLoading', true, { root: true })

      let added = null
      if (context.rootState.filter.added) {
        let date = new Date()
        date.setMonth(added.getMonth() - context.rootState.filter.added)
        added = context.rootState.filter.added !== 0 ? Math.round(date.getTime() / 1000) : null
      }

      let branch = null
      if (context.rootState.filter.branch) {
        branch = context.rootState.filter.branch.length >= 1 ? context.rootState.filter.branch.join(',') : null
      }

      let genre = null
      if (context.rootState.filter.genreFilter) {
        genre = context.rootState.filter.genreFilter.length >= 1 ? context.rootState.filter.genreFilter.join(',') : null
      }

      let lending = null
      if (context.rootState.filter.lending) {
        lending = new Date()
        lending.setMonth(lending.getMonth() - context.rootState.filter.lending)
        lending = context.rootState.filter.lending !== 0 ? Math.round(lending / 1000) : null
      }

      api(context.rootState.user.token)
        .get('/v1/book/find', {
          params: {
            term: context.rootState.filter.searchTerm,
            limit: context.rootState.filter.limit,
            offset: context.rootState.filter.offset,
            stocked: context.rootState.filter.stocked,
            added: added,
            branch: branch,
            genre: genre,
            lending: lending,
            sort: context.rootState.filter.sort,
            yearOfPublication: context.rootState.filter.yearOfPublication,
            type: context.rootState.filter.type
          }
        })
        .then(function (response) {
          if (context.rootState.filter.offset >= 1) {
            let books = context.state.books
            response.data.books.forEach(book => {
              books.push(book)
            })
            context.commit('books', books)
          } else {
            context.commit('books', response.data.books)
            context.commit('counter', response.data.counter)
          }
          context.commit('isLoading', false, { root: true })
        })
    },
    create (context, data) {
      api(context.rootState.user.token)
        .post('/v1/book/new', {
          title: data.title,
          author: data.author,
          price: data.price,
          genre: data.genre,
          stocked: data.stocked,
          yearOfPublication: data.yearOfPublication,
          type: data.type,
          premium: data.premium,
          added: data.added
        })
        .then(function (response) {
          context.commit('hasCreateError', false)
          context.commit('isDuplicate', false)
        })
        .catch(function (error) {
          context.commit('hasCreateError', true)
          if (error.response.status === 409) {
            context.commit('isDuplicate', true)
          }
        })
    },
    update (context, data) {
      api(context.rootState.user.token)
        .put('/v1/book/' + data.id, data.params)
        .then(function (response) {
          context.commit('hasUpdateError', false)
          context.commit('isDuplicate', false)
          router.push({ name: 'book' })
        })
        .catch(function (error) {
          context.commit('hasUpdateError', true)
          if (error.response.status === 409) {
            context.commit('isDuplicate', true)
          }
        })
    },
    toggleStocking (context, id) {
      api(context.rootState.user.token)
        .put('/v1/book/toggleStocking/' + id)
        .then(function (response) {
          router.push({ name: 'book' })
        })
    }
  }
}
