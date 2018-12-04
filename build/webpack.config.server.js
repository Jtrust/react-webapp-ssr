const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')    // SSR 不需要生html文件
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')


const isDev = process.env.NODE_ENV === 'development'

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  mode: isDev ? 'development' : 'production',
  entry: {
    index: path.join(__dirname, '../client/server-entry.js'),
  },
  // externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。不用打包进server-entry.js，直接require引用
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2', // 指定模块化规范
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': '"http://127.0.0.1:3333"',
    }),
  ],
})
