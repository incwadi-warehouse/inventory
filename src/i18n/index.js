import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import de from './de'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: process.env.LOCALE,
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
})

export default i18n
