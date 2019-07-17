import Vue from 'vue'
import Router from 'vue-router'
import Search from '../views/Search'
import EditBook from '../views/EditBook'
import About from '../views/About'
import Genre from '../views/Genre'
import Customer from '../views/Customer'
import NotFound from '../views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    {
      path: '/',
      name: 'book',
      component: Search
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditBook,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/genres',
      name: 'genre',
      component: Genre
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
