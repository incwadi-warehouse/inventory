import api from '../api'

export default {
  // Books
  book (context, id) {
    context.commit('isLoading', true)
    api
      .get('/book/' + id)
      .then(function (response) {
        context.commit('book', response.data)
        context.commit('genre', response.data.genre.id)
        context.commit('isLoading', false)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  search (context) {
    context.commit('isLoading', true)
    api
      .get('/book/find', {
        params: {
          term: context.state.searchTerm,
          limit: context.state.limit,
          offset: context.state.offset,
          stocked: context.state.stocked,
          added: context.state.added,
          branch: context.state.branch,
          genre: context.state.genreFilter,
          lending: context.state.lending,
          sort: context.state.sort
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
        context.commit('isLoading', false)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  create (context, data) {
    api
      .post('/book/new', {
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
    api
      .put('/book/' + data.id, data.params)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  // Genres
  genres (context) {
    api
      .get('/genre/')
      .then(function (response) {
        context.commit('genres', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  createGenre (context, name) {
    api
      .post('/genre/new', {
        name: name
      })
      .then(function (response) {
        context.dispatch('genres')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  // Branches
  branches (context) {
    api
      .get('/branch/')
      .then(function (response) {
        context.commit('branches', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  // User
  me (context) {
    api
      .get('/me')
      .then(function (response) {
        context.commit('me', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
