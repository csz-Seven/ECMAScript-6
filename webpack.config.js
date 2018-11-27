const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // entry: "./src/index.js",
    entry: {
        app: './src/10.Object.js',
    },
    // source-map
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist',
        hotOnly: true
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:['babel-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'ECMAScript 6'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
}
/**
 *  作者:Seven
 *  时间:2018/8/1 11:29
 *  Email:csz.seven@gmail.com
 *  描述:记录
 *  webpack指南：
 *      1.指南
 *      2.安装
 *      3.起步
 *      4.管理资源
 *      5.管理输出 2018-08-01 14:31:09 - 完成
 *      6.开发 2018-08-01 15:19:21 - 完成
 *      7.模块热替换 2018-08-01 17:23:21 - 完成
 *      8.tree shaking 2018-08-02 13:48:23 -
 */
