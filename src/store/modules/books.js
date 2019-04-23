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
          context.commit('genre', response.data.genre.id)
          context.commit('isLoading', false, { root: true })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    search (context) {
      context.commit('isLoading', true, { root: true })
      api(context.rootState.token)
        .get('/v1/book/find', {
          params: {
            term: context.rootState.filter.searchTerm,
            limit: context.rootState.filter.limit,
            offset: context.rootState.filter.offset,
            stocked: context.rootState.filter.stocked,
            added: context.rootState.filter.added,
            branch: context.rootState.filter.branch,
            genre: context.rootState.filter.genreFilter,
            lending: context.rootState.filter.lending,
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
