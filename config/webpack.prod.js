'use strict'

const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const pkg = require('./../package.json')

require('dotenv').config({
  path: './.env.production'
});

module.exports = {
  entry: './src/main.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './../dist'),
    publicPath: '/',
    filename: '[name].[contenthash:8].min.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: path.posix.join('img/[name].[hash:7].[ext]')
            },
          },
        ],
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: './.env.production'
    }),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: true
    }),
    new WebappWebpackPlugin({
      logo: './src/assets/icon.png',
      prefix: 'assets/',
      inject: true,
      favicons: {
        path: "/",
        appName: pkg.config.appName,
        appShortName: pkg.config.appShortName,
        appDescription: pkg.description,
        developerName: null,
        developerURL: null,
        dir: 'auto',
        lang: pkg.config.lang,
        background: pkg.config.color,
        theme_color: pkg.config.color,
        appleStatusBarStyle: 'default',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        version: pkg.version,
        logging: false,
        pixel_art: false,
        loadManifestWithCredentials: false,
        icons: {
          android: true,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false
        }
      }
    }),
    new GenerateSW({
      swDest: 'sw.js',
      importWorkboxFrom: 'local',
      importsDirectory: 'workbox',
      clientsClaim: true,
      skipWaiting: true,
      offlineGoogleAnalytics: false
    }),
    new CopyPlugin([
      { from: 'robots.txt', to: 'robots.txt' },
    ])
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true
    })],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
