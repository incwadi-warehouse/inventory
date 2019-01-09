import api from '../api'

export default {
  book (context, id) {
    api
      .get('/book', { params: { id: id } })
      .then(function (response) {
        context.commit('book', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  search (context, data) {
    api
      .get('/find', { params: data })
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
      .post('/create', {
        title: data.title,
        author: data.author,
        price: data.price,
        genre: data.genre
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
      .post('/update', data)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  genres (context) {
    api
      .get('/genres')
      .then(function (response) {
        context.commit('genres', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
