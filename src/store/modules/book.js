import api from '../../api'
import router from '../../router'

const formatDate = function (data) {
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
    added: null,
    title: null,
    authorFirstname: null,
    authorSurname: null,
    genreId: null,
    price: '2.50',
    sold: false,
    removed: false,
    releaseYear: 2019,
    type: 'paperback',
    premium: false,
    lendTo: null,
    lendOn: null
  },
  mutations: {
    added (state, added) {
      state.added = added
    },
    title (state, title) {
      state.title = title
    },
    authorFirstname (state, authorFirstname) {
      state.authorFirstname = authorFirstname
    },
    authorSurname (state, authorSurname) {
      state.authorSurname = authorSurname
    },
    genreId (state, genreId) {
      state.genreId = genreId
    },
    price (state, price) {
      state.price = price
    },
    sold (state, sold) {
      state.sold = sold
    },
    removed (state, removed) {
      state.removed = removed
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
    lendTo (state, lendTo) {
      state.lendTo = lendTo
    },
    lendOn (state, lendOn) {
      state.lendOn = lendOn
    }
  },
  actions: {
    show (context, id) {
      api(context.rootState.user.token)
        .get('/v1/book/' + id)
        .then(function (response) {
          context.commit('added', formatDate(response.data.added * 1000))
          context.commit('title', response.data.title)
          context.commit('authorFirstname', response.data.author ? response.data.author.firstname : null)
          context.commit('authorSurname', response.data.author ? response.data.author.surname : null)
          context.commit('genreId', response.data.genre ? response.data.genre.id : null)
          context.commit('price', response.data.price)
          context.commit('sold', response.data.sold)
          context.commit('removed', response.data.removed)
          context.commit('releaseYear', response.data.releaseYear)
          context.commit('type', response.data.type)
          context.commit('premium', response.data.premium)
          context.commit('lendTo', response.data.lendTo)
          context.commit('lendOn', response.data.lendOn ? formatDate(response.data.lendOn * 1000) : response.data.lendOn)
        })
    },
    create (context) {
      api(context.rootState.user.token)
        .post('/v1/book/new', {
          added: Math.round(new Date().getTime() / 1000),
          title: context.state.title,
          author: context.state.authorSurname + ',' + context.state.authorFirstname,
          genre: context.state.genreId,
          price: context.state.price,
          sold: false,
          releaseYear: context.state.releaseYear,
          type: context.state.type,
          premium: context.state.premium
        })
        .then(function () {
          context.dispatch(
            'notification/add',
            {
              msg: 'book_created',
              state: 'success'
            },
            {
              root: true
            }
          )
          context.dispatch('reset')
        })
        .catch(function (error) {
          context.commit(
            'notification/add',
            {
              msg: 'book_not_valid',
              state: 'error'
            },
            {
              root: true
            }
          )
          if (error.response.status === 409) {
            context.dispatch(
              'notification/add',
              {
                msg: 'book_not_valid_duplicate',
                state: 'error'
              },
              {
                root: true
              }
            )
          }
        })
    },
    update (context, id) {
      api(context.rootState.user.token)
        .put('/v1/book/' + id, {
          added: new Date(context.state.added).getTime() / 1000,
          title: context.state.title,
          author: context.state.authorSurname + ',' + context.state.authorFirstname,
          genre: context.state.genreId,
          price: context.state.price,
          sold: context.state.sold,
          removed: context.state.removed,
          releaseYear: context.state.releaseYear,
          type: context.state.type,
          premium: context.state.premium,
          lendTo: context.state.lendTo,
          lendOn: context.state.lendOn ? new Date(context.state.lendOn).getTime() / 1000 : null
        })
        .then(function () {
          router.push({ name: 'index' })
          context.dispatch(
            'notification/add',
            {
              msg: 'book_updated',
              state: 'success'
            },
            {
              root: true
            }
          )
        })
        .catch(function (error) {
          context.dispatch(
            'notification/add',
            {
              msg: 'book_not_valid',
              state: 'error'
            },
            {
              root: true
            }
          )
          if (error.response.status === 409) {
            context.dispatch(
              'notification/add',
              {
                msg: 'book_not_valid_duplicate',
                state: 'error'
              },
              {
                root: true
              }
            )
          }
        })
    },
    sell (context, book) {
      api(context.rootState.user.token)
        .put('/v1/book/sell/' + book.id)
        .then(function () {
          context.commit('search/removeBook', book, { root: true })
          context.commit('filter/offset', context.rootState.filter.offset - 1, { root: true })
          context.dispatch(
            'notification/add',
            {
              msg: 'book_sell_success',
              state: 'success'
            },
            {
              root: true
            }
          )
        })
        .catch(function () {
          context.dispatch(
            'notification/add',
            {
              msg: 'book_sell_error',
              state: 'error'
            },
            {
              root: true
            }
          )
        })
    },
    remove (context, book) {
      api(context.rootState.user.token)
        .put('/v1/book/remove/' + book.id)
        .then(function () {
          context.commit('search/removeBook', book, { root: true })
          context.commit('filter/offset', context.rootState.filter.offset - 1, { root: true })
          context.dispatch(
            'notification/add',
            {
              msg: 'book_remove_success',
              state: 'success'
            },
            {
              root: true
            }
          )
        })
        .catch(function () {
          context.dispatch(
            'notification/add',
            {
              msg: 'book_remove_error',
              state: 'error'
            },
            {
              root: true
            }
          )
        })
    },
    reset (context) {
      context.commit('search/tab', null, { root: true })
      context.commit('added', null)
      context.commit('title', null)
      context.commit('authorFirstname', null)
      context.commit('authorSurname', null)
      context.commit('genreId', null)
      context.commit('price', '2.50')
      context.commit('sold', false)
      context.commit('releaseYear', 2019)
      context.commit('type', 'paperback')
      context.commit('premium', false)
    }
  }
}
