import api from '../../api'

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
    }
  },
  mutations: {
    books (state, books) {
      state.books = books
    },
    book (state, book) {
      state.book = book
    }
  },
  actions: {
    book (context, id) {
      context.commit('isLoading', true, { root: true })
      api(context.rootState.token)
        .get('/v1/book/' + id)
        .then(function (response) {
          context.commit('book', response.data)
          context.commit('genres/genre', response.data.genre.id, { root: true })
          context.commit('isLoading', false, { root: true })
        })
        .catch(function (error) {
          console.log(error)
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

      api(context.rootState.token)
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
            sort: context.rootState.filter.sort
          }
        })
        .then(function (response) {
          if (context.state.offset >= 1) {
            let books = context.state.books
            response.data.forEach(book => {
              books.push(book)
            })
            context.commit('books', books)
          } else {
            context.commit('books', response.data)
          }
          context.commit('isLoading', false, { root: true })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    create (context, data) {
      api(context.rootState.token)
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
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    update (context, data) {
      api(context.rootState.token)
        .put('/v1/book/' + data.id, data.params)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
