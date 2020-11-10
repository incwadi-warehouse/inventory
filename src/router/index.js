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
      name: 'search',
      component: () => import('../views/SearchView'),
    },
    {
      path: '/book/:bookId',
      name: 'book',
      component: () => import('../views/SearchView'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView'),
    },
    {
      path: '/genre',
      name: 'genre',
      component: () => import('../views/GenreView'),
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('../views/StaffView'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView'),
    },
    {
      path: '/branch',
      name: 'branch',
      component: () => import('../views/BranchView'),
    },
    {
      path: '/author/:id',
      name: 'author',
      component: () => import('../views/AuthorView'),
      props(route) {
        const props = route.params
        props.id = +props.id
        return props
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView'),
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('../views/404View'),
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
