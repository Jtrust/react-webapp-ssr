const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/',
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 代码编译之前 检测
        test: /.(js|jsx)$/,
        use: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
      },
      {
        test: /.jsx$/,
        use: ['babel-loader'],
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
      },
      {
        test: /.js$/,
        use: ['babel-loader'],
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
