import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: () => import('../views/SearchView'),
  },
  {
    path: '/book/new',
    name: 'book.new',
    component: () => import('../views/SearchView'),
    props: { showCreateBook: true },
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
    path: '/reservation',
    name: 'reservation',
    component: () => import('../views/ReservationView'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView'),
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFoundView'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  store.commit('showOffCanvas', false)
  next()
})

export default router
