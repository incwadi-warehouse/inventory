import api from '../api'
import router from '../router'
import i18n from '../i18n'
import { notification } from '@baldeweg/components'

export default {
  namespaced: true,
  state: {
    books: [],
    book: null,
    counter: 0,
    cover: null,
    stats: null,
    isStatsLoading: true,
  },
  mutations: {
    books(state, books) {
      state.books = books
    },
    book(state, book) {
      state.book = book
    },
    removeBook(state, book) {
      const id = state.books.indexOf(book)
      state.books.splice(id, 1)
    },
    counter(state, counter) {
      state.counter = counter
    },
    cover(state, cover) {
      state.cover = cover
    },
    stats(state, stats) {
      state.stats = stats
    },
    isStatsLoading(state, isStatsLoading) {
      state.isStatsLoading = isStatsLoading
    },
  },
  actions: {
    find(context, me) {
      const filters = context.rootState.search.elements
      context.commit('search/isLoading', true, { root: true })

      let flattenedFilters = []
      Object.keys(filters).forEach((key) => {
        if (!filters[key]) return
        if (
          !filters[key].field &&
          !filters[key].operator &&
          !filters[key].value
        )
          return
        if (filters[key].field === 'added' || filters[key].field === 'lendOn') {
          const date = new Date(filters[key].value)

          return flattenedFilters.push({
            field: filters[key].field,
            operator: filters[key].operator,
            value: date.getTime() / 1000,
          })
        }
        if (filters[key].field === 'genre') {
          if (filters[key].value.length === 0) {
            let genres = []
            context.rootState.genre.genres.forEach((genre) => {
              genres.push(genre.id)
            })

            return flattenedFilters.push({
              field: filters[key].field,
              operator: filters[key].operator,
              value: genres,
            })
          }
        }
        if (filters[key].field === 'branch') {
          if (filters[key].value.length === 0) {
            return flattenedFilters.push({
              field: filters[key].field,
              operator: filters[key].operator,
              value: [me.branch.id],
            })
          }
        }
        return flattenedFilters.push(filters[key])
      })

      let term = undefined
      if (context.rootState.search.term) {
        term = context.rootState.search.term
      }

      let filter = undefined
      if (flattenedFilters.length >= 1) {
        filter = flattenedFilters
      }

      let orderBy = undefined
      if (
        context.rootState.search.orderByField ||
        context.rootState.search.orderByDirection
      ) {
        orderBy = { book: [{}] }
        if (context.rootState.search.orderByField) {
          orderBy.book[0].field = context.rootState.search.orderByField
        }
        if (context.rootState.search.orderByDirection) {
          orderBy.book[0].direction = context.rootState.search.orderByDirection
        }
      }

      api()
        .get('/api/book/find', {
          params: {
            options: {
              term,
              filter,
              orderBy,
              limit: context.rootState.search.limit,
            },
          },
        })
        .then(function (response) {
          context.commit('books', response.data.books)
          context.commit('counter', response.data.counter)
          context.dispatch('author/authors', null, { root: true })
        })
        .finally(function () {
          context.commit('search/isLoading', false, { root: true })
        })
    },
    show(context, id) {
      api()
        .get('/api/book/' + id)
        .then(function (response) {
          context.commit('book', response.data)
          context.commit('tag/tags', response.data.tags, { root: true })
        })
        .catch(function () {
          router.replace({ name: 'not-found' })
        })
    },
    create(context, data) {
      return new Promise((resolve, reject) => {
        api()
          .post('/api/book/new', {
            added: data.added,
            title: data.title,
            shortDescription: data.shortDescription,
            author: data.author,
            genre: data.genre,
            price: data.price,
            sold: data.sold,
            removed: data.removed,
            releaseYear: data.releaseYear,
            type: data.type,
            lendTo: data.lendTo,
            lendOn: data.lendOn,
            cond: data.cond,
            tags: data.tags,
            format: data.format,
          })
          .then(function () {
            notification.create(i18n.t('book_created'), 'success')
            resolve()
          })
          .catch(function (error) {
            notification.create(i18n.t('book_not_valid'), 'error')
            if (error.response.status === 409) {
              notification.create(i18n.t('book_not_valid_duplicate'), 'error')
            }
            reject()
          })
      })
    },
    update(context, data) {
      return new Promise((resolve, reject) => {
        api()
          .put('/api/book/' + data.id, {
            added: data.added,
            title: data.title,
            shortDescription: data.shortDescription,
            author: data.author,
            genre: data.genre,
            price: data.price,
            sold: data.sold,
            removed: data.removed,
            reserved: data.reserved,
            releaseYear: data.releaseYear,
            type: data.type,
            lendTo: data.lendTo,
            lendOn: data.lendOn,
            cond: data.cond,
            tags: data.tags,
            recommendation: data.recommendation,
            format: data.format,
          })
          .then(function () {
            context.dispatch('find', data.me)
            notification.create(i18n.t('book_updated'), 'success')
            resolve()
          })
          .catch(function (error) {
            notification.create(i18n.t('book_not_valid'), 'error')
            if (error.response.status === 409) {
              notification.create(i18n.t('book_not_valid_duplicate'), 'error')
            }
            reject()
          })
      })
    },
    getCover(context, data) {
      api()
        .get('/api/book/cover/' + data.id)
        .then(function (response) {
          context.commit('cover', response.data)
        })
    },
    upload(context, data) {
      return api().post('/api/book/cover/' + data.id, data.form)
    },
    removeCover(context, data) {
      api()
        .delete('/api/book/cover/' + data.id)
        .then(function () {
          context.dispatch('getCover', data)
        })
    },
    sell(context, book) {
      api()
        .put('/api/book/sell/' + book.id)
        .then(function () {
          context.commit('removeBook', book)
          notification.create(i18n.t('book_sell_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('book_sell_error'), 'error')
        })
    },
    remove(context, book) {
      api()
        .put('/api/book/remove/' + book.id)
        .then(function () {
          context.commit('removeBook', book)
          notification.create(i18n.t('book_remove_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('book_remove_error'), 'error')
        })
    },
    reserve(context, book) {
      api()
        .put('/api/book/reserve/' + book.id)
        .then(function () {
          context.commit('removeBook', book)
          notification.create(i18n.t('book_reserve_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('book_reserve_error'), 'error')
        })
    },
    bookFound(context, { me, id }) {
      api()
        .put('/api/book/inventory/found/' + id)
        .then(() => {
          context.dispatch('find', me)
        })
    },
    bookNotFound(context, { me, id }) {
      api()
        .put('/api/book/inventory/notfound/' + id)
        .then(() => {
          context.dispatch('find', me)
        })
    },
    clean() {
      api()
        .delete('/api/book/clean')
        .then(function () {
          notification.create(i18n.t('book_clean_success'), 'success')
        })
        .catch(function () {
          notification.create(i18n.t('book_clean_error'), 'error')
        })
    },
    stats(context) {
      context.commit('isStatsLoading', true)
      api()
        .get('/api/book/stats/')
        .then(function (response) {
          context.commit('stats', response.data)
        })
        .finally(function () {
          context.commit('isStatsLoading', false)
        })
    },
  },
}
