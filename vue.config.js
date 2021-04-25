module.exports = {
  devServer: {
    open: true,
  },
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
    },
    name: 'incwadi',
    themeColor: '#d7621d',
  },
  pluginOptions: {
    i18n: {
      locale: 'de-DE',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
