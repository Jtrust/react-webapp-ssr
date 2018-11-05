const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')    // SSR 不需要生html文件
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        index:  path.join(__dirname, '../client/server-entry.js'),
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',
        libraryTarget:'commonjs2'  // 指定模块化规范
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [

            {
                test: /.jsx$/,
                use: ['babel-loader'],
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test: /.js$/,
                use: ['babel-loader'],
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    },
    
}
