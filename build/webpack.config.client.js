const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'


const config = webpackMerge(baseConfig, {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.resolve(__dirname, '../client/app.js'),
  },
  output: {
    filename: '[name].[hash].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../client/template.html'),
    }),
    new HtmlWebpackPlugin({
      // 指定loader：ejs-compiled-loader
      template: `!!ejs-compiled-loader!${path.resolve(__dirname, '../client/server.template.ejs')}`,
      // template: path.resolve(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs',
    }),
  ],
})

if (isDev) {
  config.devServer = {
    host: '0.0.0.0', // 可通过127.0.0.1  localhost  或者 局域网本机ip访问
    port: '8888',
    contentBase: path.resolve(__dirname, '../dist'), //  通常与 output的path相同。如果存在dist目录，就在此目录下找资源
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html', // 任意的 404 响应都可能需要被替代为 index.html
    },
    hot: true,
    open: true,
    overlay: {
      error: true,
    },
    proxy: {
      '/api': 'http://localhost:3333',
    },

  }

  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
