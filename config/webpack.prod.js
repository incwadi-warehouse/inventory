'use strict'

const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const pkg = require('./../package.json')

module.exports = {
  entry: './src/main.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './../dist'),
    publicPath: '/',
    filename: '[contenthash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
          limit: 4096,
          name: path.posix.join('img/[name].[hash].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: path.posix.join('img/[name].[hash].[ext]')
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            }
          },
        ]
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        decodeEntities: true
      }
    }),
    new FaviconsWebpackPlugin({
      logo: './static/icon.svg',
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
      swDest: 'sw.js'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static/robots.txt', to: 'robots.txt' },
      ]
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  }
}
