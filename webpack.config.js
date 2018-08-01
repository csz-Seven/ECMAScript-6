const path = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path:path.resolve(__dirname,'dist')
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
*/
