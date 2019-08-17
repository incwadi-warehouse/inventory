import Vue from 'vue'
import Router from 'vue-router'
import Search from '../views/Search'
import EditBook from '../views/EditBook'
import About from '../views/About'
import Genre from '../views/Genre'
import Customer from '../views/Customer'
import Stats from '../views/Stats'
import NotFound from '../views/NotFound'
import EditAuthor from '../views/EditAuthor'
import store from '../store'

Vue.use(Router)

const router = new Router({
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
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/author/edit/:id',
      name: 'edit-author',
      component: EditAuthor,
      props: true
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('navigation/showOffCanvas', false)
  next()
})

export default router
