import api from '../api'

export default {
  book (context, id) {
    api
      .get('/book/' + id)
      .then(function (response) {
        context.commit('book', response.data)
        context.commit('genre', response.data.genre.id)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  search (context, data) {
    api
      .get('/book/find', { params: data })
      .then(function (response) {
        if (data.offset >= 1) {
          let books = context.state.books
          response.data.forEach(book => {
            books.push(book)
          })
          context.commit('books', books)
        } else {
          context.commit('books', response.data)
        }
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
