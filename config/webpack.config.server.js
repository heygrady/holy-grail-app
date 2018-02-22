const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

const paths = require('./paths')
const config = require('./webpack.config.prod')

config.entry = './src/index.server.js'

config.output.path = paths.appServer
config.output.publicPath = '/'
config.output.filename = '[name].js'
config.output.libraryTarget = 'commonjs2'
delete config.output.chunkFilename

config.target = 'node'
config.externals = /^[a-z\-0-9]+$/
delete config.devtool

config.module.rules[2].oneOf[3].loader.splice(0, 2, {
  loader: require.resolve('to-string-loader')
})
config.module.rules[2].oneOf[4].loader.splice(0, 2, {
  loader: require.resolve('to-string-loader')
})

config.plugins = config.plugins.filter(
  plugin =>
    !(
      plugin instanceof webpack.optimize.CommonsChunkPlugin ||
      plugin instanceof HtmlWebpackPlugin ||
      plugin instanceof ManifestPlugin ||
      plugin instanceof SWPrecacheWebpackPlugin ||
      plugin instanceof ReactLoadablePlugin
    )
)

module.exports = config
