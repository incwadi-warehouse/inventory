import api from '../../api'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    books: [],
    book: {
      title: null,
      author: null,
      firstname: '',
      surname: null,
      price: null,
      sold: false,
      removed: false,
      releaseYear: 2019,
      type: 'paperpack',
      premium: false,
      added: null,
      lendTo: null,
      lendOn: null,
      genre: null,
      genre_id: null
    },
    title: null,
    author: null,
    firstname: '',
    surname: null,
    genre: null,
    added: null,
    price: '2.50',
    sold: null,
    releaseYear: 2019,
    type: 'paperback',
    premium: false,

    counter: 0,
    hasCreateError: false,
    hasUpdateError: false,
    isDuplicate: false,
    tab: null,
    isLoading: false
  },
  mutations: {
    books (state, books) {
      state.books = books
    },
    addBook (state, book) {
      state.books.push(book)
    },
    removeBook (state, book) {
      const id = state.books.indexOf(book)
      state.books.splice(id, 1)
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
      state.book.title = title
      state.title = title
    },
    firstname (state, firstname) {
      state.book.firstname = firstname
      state.firstname = firstname
    },
    surname (state, surname) {
      state.book.surname = surname
      state.surname = surname
    },
    price (state, price) {
      state.book.price = price
      state.price = price
    },
    releaseYear (state, releaseYear) {
      state.book.releaseYear = releaseYear
      state.releaseYear = releaseYear
    },
    type (state, type) {
      state.book.type = type
      state.type = type
    },
    premium (state, premium) {
      state.book.premium = premium
      state.premium = premium
    },
    genre (state, genre) {
      state.book.genre = genre
      state.genre = genre
    },
    genre_id (state, genre) {
      state.book.genre_id = genre
    },
    sold (state, sold) {
      state.book.sold = sold
    },
    added (state, added) {
      state.book.added = added
    },
    lendTo (state, lendTo) {
      state.book.lendTo = lendTo
    },
    lendOn (state, lendOn) {
      state.book.lendOn = lendOn
    },
    removed (state, status) {
      state.book.removed = status
    }
  },
  actions: {
    book (context, id) {
      context.commit('isLoading', true)
      api(context.rootState.user.token)
        .get('/v1/book/' + id)
        .then(function (response) {
          context.commit('book', response.data)
          context.commit('genre_id', response.data.genre ? response.data.genre.id : null)
          context.commit('firstname', response.data.author.firstname)
          context.commit('surname', response.data.author.surname)
          context.commit('isLoading', false)
        })
    },
    search (context) {
      if (!context.rootState.filter.searchTerm) return
      const isReleaseYearInRange = context.rootState.filter.releaseYear === null || (context.rootState.filter.releaseYear >= 1000 && context.rootState.filter.releaseYear <= 9999)
      if (!isReleaseYearInRange) return

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
            response.data.books.forEach(book => {
              context.commit('addBook', book)
            })
          } else {
            context.commit('books', response.data.books)
            context.commit('counter', response.data.counter)
            context.commit('filter/offset', context.rootState.book.books.length, { root: true })
          }
          context.commit('isLoading', false)
          context.dispatch('author/authors', null, { root: true })
        })
    },
    create (context) {
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
        .then(function () {
          context.dispatch('notification/add', { msg: 'book_created', state: 'success' }, { root: true })
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
    update (context, id) {
      api(context.rootState.user.token)
        .put('/v1/book/' + id, {
          genre: context.state.book.genre_id,
          title: context.state.book.title,
          author: context.state.book.surname + ',' + context.state.firstname,
          price: context.state.book.price,
          sold: context.state.book.sold,
          removed: context.state.book.removed,
          releaseYear: context.state.book.releaseYear,
          type: context.state.book.type,
          premium: context.state.book.premium,
          added: new Date(context.state.book.added).getTime() / 1000,
          lendTo: context.state.book.lendTo,
          lendOn: context.state.book.lendOn === '' ? null : new Date(context.state.book.lendOn).getTime() / 1000
        })
        .then(function () {
          context.dispatch('notification/add', { msg: 'book_updated', state: 'success' }, { root: true })
          context.commit('hasUpdateError', false)
          context.commit('isDuplicate', false)
          router.push({ name: 'index' })
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
    }
  }
}
