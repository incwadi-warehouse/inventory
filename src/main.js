import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'
import cssVars from 'css-vars-ponyfill'
import 'core-js/features/promise'
import 'core-js/features/number/parse-float'
import meta from './meta'
import components from './components'
import './theme.css'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

cssVars({
  variables: {},
})

if (process.env.VUE_APP_THEME !== 'false') {
  import('../' + process.env.VUE_APP_THEME)
}

new Vue({
  router,
  store,
  i18n,
  meta,
  components,
  render: (h) => h(App),
}).$mount('#app')
