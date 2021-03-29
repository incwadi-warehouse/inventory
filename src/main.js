import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './locales'
import cssVars from 'css-vars-ponyfill'
import 'core-js/features/promise'
import 'core-js/features/number/parse-float'
import components from '@baldeweg/components'
import VueMeta from 'vue-meta'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(components)
Vue.themes()
Vue.use(VueMeta, {
  keyName: 'head',
})
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

cssVars({
  variables: {
    'color-primary-10':
      process.env.COLOR10 !== 'false' ? process.env.COLOR10 : '#d7621d',
    'color-primary-05':
      process.env.COLOR05 !== 'false' ? process.env.COLOR05 : '#e9915d',
    'color-primary-00':
      process.env.COLOR00 !== 'false' ? process.env.COLOR00 : '#f3c2a5',
    'masthead-height': '66px',
  },
})

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('SW registered!')
        })
        .catch(() => {
          console.log('SW registration failed!')
        })
    })
  }
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App,
  },
})
