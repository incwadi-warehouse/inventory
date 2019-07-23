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
      sold: null
    },
    counter: 0,
    hasCreateError: false,
    hasUpdateError: false,
    isDuplicate: false,
    tab: null,
    isLoading: false,
    title: null,
    firstname: '',
    surname: null,
    price: '2.50',
    releaseYear: 2019,
    type: 'paperback',
    premium: false,
    genre: null,
    stats: null
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
    },
    tab (state, tab) {
      state.tab = tab
    },
    isLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    title (state, title) {
      state.title = title
    },
    firstname (state, firstname) {
      state.firstname = firstname
    },
    surname (state, surname) {
      state.surname = surname
    },
    price (state, price) {
      state.price = price
    },
    releaseYear (state, releaseYear) {
      state.releaseYear = releaseYear
    },
    type (state, type) {
      state.type = type
    },
    premium (state, premium) {
      state.premium = premium
    },
    genre (state, genre) {
      state.genre = genre
    },
    stats (state, stats) {
      state.stats = stats
    }
  },
  actions: {
    book (context, id) {
      context.commit('isLoading', true)
      api(context.rootState.user.token)
        .get('/v1/book/' + id)
        .then(function (response) {
          context.commit('book', response.data)
          context.commit('isLoading', false)
        })
    },
    search (context) {
      if (!context.rootState.filter.searchTerm) return
      context.commit('isLoading', true)

      let added = null
      if (context.rootState.filter.added) {
        added = new Date()
        added.setMonth(added.getMonth() - context.rootState.filter.added)
        added = context.rootState.filter.added !== 0 ? Math.round(added.getTime() / 1000) : null
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
        lending = context.rootState.filter.lending !== 0 ? Math.round(lending.getTime() / 1000) : null
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
        .then(function (response) {
          if (context.rootState.filter.offset >= 1) {
            let books = context.state.book
            response.data.books.forEach(book => {
              books.push(book)
            })
            context.commit('books', books)
          } else {
            context.commit('books', response.data.books)
            context.commit('counter', response.data.counter)
          }
          context.commit('isLoading', false)
        })
    },
    create (context, data) {
      api(context.rootState.user.token)
        .post('/v1/book/new', {
          title: context.state.title,
          author: context.state.surname + ',' + context.state.firstname,
          price: context.state.price,
          genre: context.state.genre,
          sold: false,
          releaseYear: context.state.releaseYear,
          type: context.state.type,
          premium: context.state.premium,
          added: Math.round(new Date().getTime() / 1000)
        })
        .then(function (response) {
          context.dispatch('notice/add', 'book_created', { root: true })
          context.commit('hasCreateError', false)
          context.commit('isDuplicate', false)
          context.commit('tab', null)

          context.commit('title', null)
          context.commit('firstname', null)
          context.commit('surname', null)
          context.commit('price', '2.50')
          context.commit('genre', null)
          context.commit('releaseYear', 2019)
          context.commit('type', 'paperback')
          context.commit('premium', false)
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
          context.dispatch('notice/add', 'book_updated', { root: true })
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
    sell (context, id) {
      api(context.rootState.user.token)
        .put('/v1/book/sell/' + id)
    },
    remove (context, id) {
      api(context.rootState.user.token)
        .put('/v1/book/remove/' + id)
    },
    stats (context) {
      api(context.rootState.user.token)
        .get('/v1/book/stats')
        .then(function (response) {
          context.commit('stats', response.data)
        })
    }
  }
}
