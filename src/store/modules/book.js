import api from '../../api'
import router from '../../router'
import { notification } from '@baldeweg/components'

const formatDate = function(data) {
  const date = new Date(data)
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }

  return date.getFullYear() + '-' + month + '-' + day
}

export default {
  namespaced: true,
  state: {
    added: formatDate(Math.round(new Date().getTime() / 1000) * 1000),
    title: null,
    authorFirstname: '',
    authorSurname: null,
    genreId: null,
    price: '2.50',
    sold: false,
    removed: false,
    releaseYear: 2019,
    type: 'paperback',
    lendTo: null,
    lendOn: null,
    cond_id: null
  },
  mutations: {
    added(state, added) {
      state.added = added
    },
    title(state, title) {
      state.title = title
    },
    authorFirstname(state, authorFirstname) {
      state.authorFirstname = authorFirstname
    },
    authorSurname(state, authorSurname) {
      state.authorSurname = authorSurname
    },
    genreId(state, genreId) {
      state.genreId = genreId
    },
    price(state, price) {
      state.price = price
    },
    sold(state, sold) {
      state.sold = sold
    },
    removed(state, removed) {
      state.removed = removed
    },
    releaseYear(state, releaseYear) {
      state.releaseYear = releaseYear
    },
    type(state, type) {
      state.type = type
    },
    lendTo(state, lendTo) {
      state.lendTo = lendTo
    },
    lendOn(state, lendOn) {
      state.lendOn = lendOn
    },
    cond_id(state, cond_id) {
      state.cond_id = cond_id
    }
  },
  actions: {
    show(context, id) {
      api(context.rootState.user.token)
        .get('/v1/book/' + id)
        .then(function(response) {
          context.commit('added', formatDate(response.data.added * 1000))
          context.commit('title', response.data.title)
          context.commit(
            'authorFirstname',
            response.data.author ? response.data.author.firstname : null
          )
          context.commit(
            'authorSurname',
            response.data.author ? response.data.author.surname : null
          )
          context.commit(
            'genreId',
            response.data.genre ? response.data.genre.id : null
          )
          context.commit('price', response.data.price)
          context.commit('sold', response.data.sold)
          context.commit('removed', response.data.removed)
          context.commit('releaseYear', response.data.releaseYear)
          context.commit('type', response.data.type)
          context.commit('lendTo', response.data.lendTo)
          context.commit(
            'lendOn',
            response.data.lendOn
              ? formatDate(response.data.lendOn * 1000)
              : response.data.lendOn
          )
          context.commit(
            'cond_id',
            response.data.condition ? response.data.condition.id : null
          )
        })
    },
    create(context) {
      api(context.rootState.user.token)
        .post('/v1/book/new', {
          added: new Date(context.state.added).getTime() / 1000,
          title: context.state.title,
          author:
            context.state.authorSurname + ',' + context.state.authorFirstname,
          genre: context.state.genreId,
          price: context.state.price,
          sold: false,
          releaseYear: context.state.releaseYear,
          type: context.state.type,
          cond: context.state.cond_id
        })
        .then(function() {
          notification.create('book_created', 'success')
          context.dispatch('reset')
        })
        .catch(function(error) {
          notification.create('book_not_valid', 'error')
          if (error.response.status === 409) {
            notification.create('book_not_valid_duplicate', 'error')
          }
        })
    },
    update(context, id) {
      api(context.rootState.user.token)
        .put('/v1/book/' + id, {
          added: new Date(context.state.added).getTime() / 1000,
          title: context.state.title,
          author:
            context.state.authorSurname + ',' + context.state.authorFirstname,
          genre: context.state.genreId,
          price: context.state.price,
          sold: context.state.sold,
          removed: context.state.removed,
          releaseYear: context.state.releaseYear,
          type: context.state.type,
          lendTo: context.state.lendTo,
          lendOn: context.state.lendOn
            ? new Date(context.state.lendOn).getTime() / 1000
            : null,
          cond: context.state.cond_id
        })
        .then(function() {
          context.dispatch('search/search', null, { root: true })
          router.push({ name: 'index' })
          notification.create('book_updated', 'success')
        })
        .catch(function(error) {
          notification.create('book_not_valid', 'error')
          if (error.response.status === 409) {
            notification.create('book_not_valid_duplicate', 'error')
          }
        })
    },
    sell(context, book) {
      api(context.rootState.user.token)
        .put('/v1/book/sell/' + book.id)
        .then(function() {
          context.commit('search/removeBook', book, { root: true })
          notification.create('book_sell_success', 'success')
        })
        .catch(function() {
          notification.create('book_sell_error', 'error')
        })
    },
    remove(context, book) {
      api(context.rootState.user.token)
        .put('/v1/book/remove/' + book.id)
        .then(function() {
          context.commit('search/removeBook', book, { root: true })
          notification.create('book_remove_success', 'success')
        })
        .catch(function() {
          notification.create('book_remove_error', 'error')
        })
    },
    reset(context) {
      context.commit('search/tab', null, { root: true })
      context.commit(
        'added',
        formatDate(Math.round(new Date().getTime() / 1000) * 1000)
      )
      context.commit('title', null)
      context.commit('authorFirstname', '')
      context.commit('authorSurname', null)
      context.commit('genreId', null)
      context.commit('price', '2.50')
      context.commit('sold', false)
      context.commit('releaseYear', 2019)
      context.commit('type', 'paperback')
      context.commit('cond_id', null)
      context.commit('search/tab', false, { root: true })
    },
    clean(context) {
      api(context.rootState.user.token)
        .delete('/v1/book/clean')
        .then(function() {
          notification.create('book_clean_success', 'success')
        })
        .catch(function() {
          notification.create('book_clean_error', 'error')
        })
    }
  }
}
