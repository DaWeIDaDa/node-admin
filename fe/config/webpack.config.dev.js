// console.log(1)


const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    //模式
    mode :"development",
    //入口文件
    entry: './src/app.js',
    //出口
    output: {
        path : path.resolve(__dirname,"../dev"),
        filename : "app.js"
    },
    devServer:{
        contentBase:path.join(__dirname,"../dev"),
        compress:true,
        port : 8000,
        proxy: {
            "/api": "http://localhost:3000"
        }
    },
    //打包html css js
    plugins:[
        //具体用法在github中找到 这里主要是导入html文本
        new HtmlWebpackPlugin({
            //目标文件
            template : './index.html',
            //打完包返回的文件
            filename : 'index.html'
        }),
        //拷贝样式
        new copyWebpackPlugin([{
            from :'./public',
            to : "./public"
        }])
    ],
    //loader们
    module:{
        rules:[
            {
                test:/\.art$/,
                loader:'art-template-loader'
            },
            {
                test:/\.(scss|css)$/,
                loader:['style-loader','css-loader','sass-loader']
            }
        ]
    }

}