import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Create from '../views/Create'
import Edit from '../views/Edit'
import NotFound from '../views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: window.config.base,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
      props: true
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
