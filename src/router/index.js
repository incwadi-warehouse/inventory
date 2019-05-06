import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Edit from '../views/Edit'
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
      name: 'index',
      component: Index
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
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
