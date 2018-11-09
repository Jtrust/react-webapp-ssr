const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')    // SSR 不需要生html文件
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')


const isDev = process.env.NODE_ENV === 'development'

module.exports = webpackMerge(baseConfig, {
  mode: isDev ? 'development' : 'production',
  entry: {
    index: path.join(__dirname, '../client/server-entry.js'),
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2', // 指定模块化规范
  },

})
