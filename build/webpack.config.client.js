const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: path.join(__dirname, '../client/app.js'),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            /*{
                enforce: 'pre',
                test: /.(js|jsx)$/,
                use: ['eslint-loader',],
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            },*/
            {
                test: /.jsx$/,
                use: ['babel-loader']
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
    plugins: [
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'../client/template.html')
        })
    ]
}
