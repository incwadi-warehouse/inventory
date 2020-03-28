import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const Search = () => import('../views/Search')
const EditBook = () => import('../views/EditBook')
const CreateBook = () => import('../views/CreateBook')
const About = () => import('../views/About')
const Genre = () => import('../views/Genre')
const Staff = () => import('../views/Staff')
const Stats = () => import('../views/Stats')
const NotFound = () => import('../views/NotFound')
const EditAuthor = () => import('../views/EditAuthor')
const Profile = () => import('../views/Profile')
const Branch = () => import('../views/Branch')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Search
    },
    {
      path: '/book/new',
      name: 'create-book',
      component: CreateBook,
      props: true
    },
    {
      path: '/book/edit/:id',
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
      path: '/genre',
      name: 'genre',
      component: Genre
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/branch',
      name: 'branch',
      component: Branch
    },
    {
      path: '/author/edit/:id',
      name: 'edit-author',
      component: EditAuthor,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
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
