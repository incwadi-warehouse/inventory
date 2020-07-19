import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/Search'),
    },
    {
      path: '/book/edit/:id',
      name: 'edit',
      component: () => import('../views/EditBook'),
      props(route) {
        const props = route.params
        props.id = +props.id
        return props
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About'),
    },
    {
      path: '/genre',
      name: 'genre',
      component: () => import('../views/Genre'),
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('../views/Staff'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/Stats'),
    },
    {
      path: '/branch',
      name: 'branch',
      component: () => import('../views/Branch'),
    },
    {
      path: '/author/:id',
      name: 'author',
      component: () => import('../views/Author'),
      props(route) {
        const props = route.params
        props.id = +props.id
        return props
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile'),
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('../views/404'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  store.commit('app/showOffCanvas', false)
  next()
})

export default router
