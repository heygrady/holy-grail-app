const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

const config = require('./webpack.config.prod')

config.entry = './src/index.server.js'

config.output.filename = 'static/server/[name].js'
config.output.libraryTarget = 'commonjs2'
delete config.output.chunkFilename

config.target = 'node'
config.externals = /^[a-z\-0-9]+$/
delete config.devtool

config.module.rules[1].oneOf[2].loader.splice(0, 2, {
  loader: require.resolve('to-string-loader')
})

config.plugins = config.plugins.filter(
  plugin =>
    !(
      plugin instanceof HtmlWebpackPlugin ||
      plugin instanceof ManifestPlugin ||
      plugin instanceof SWPrecacheWebpackPlugin
    )
)
const index = config.plugins.findIndex(
  plugin => plugin instanceof ReactLoadablePlugin
)

config.plugins[index] = new ReactLoadablePlugin({
  filename: './build/react-loadable.server.json'
})

module.exports = config
