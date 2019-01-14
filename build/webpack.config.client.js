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
  config.devtool = '#cheap-modules-eval-source-map'
  config.devServer = {
    host: '0.0.0.0', // 可通过127.0.0.1  localhost  或者 局域网本机ip访问
    port: '8888',
    // contentBase: path.resolve(__dirname, '../dist'), //  通常与 output的path相同。如果存在dist目录，就在此目录下找资源
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
} else {
  config.entry = {
    app: path.resolve(__dirname, '../client/app.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'mobx',
      'mobx-react',
      'axios',
      'query-string',
      'dateformat',
      'marked',
    ],
  };
  config.output.filename = '[name].[contenthash].js';
  config.optimization = {
    namedModules: true,
    namedChunks: true,
    runtimeChunk: {// runtimeChunk可以配置成true，single或者对象，用自动计算当前构建的一些基础chunk信息，类似之前版本中的manifest信息获取方式
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minSize: 3000,
          minChunks: 1,
          chunks: 'initial',
          priority: 1, // 该配置项是设置处理的优先级，数值越大越优先处理
        },
        commons: {
          test: /[\\/]client[\\/]/,
          name: 'common',
          minSize: 3000,
          minChunks: 3,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true, // 这个配置允许我们使用已经存在的代码块
        },

      },
    },
  }
}

module.exports = config
