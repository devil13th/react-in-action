//拷贝首页，并添加js引用 、压缩、替换文本等功能
const HtmlWebpackPlugin = require('html-webpack-plugin')
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: './main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  mode:"development",
  plugins: [
    new HtmlWebpackPlugin({
      filename:'./index.html', //通过模板生成的文件名
        template:'./index.html',//模板路径
        inject:true, //是否自动在模板文件添加 自动生成的js文件链接的位置 允许插件修改哪些内容，true/'head'/'body'/false,
        title:'这个是WebPack Demo',
        sss:"xxx",
        minify:{
          removeComments:true //是否压缩时 去除注释
        }
    }),
    new CleanWebpackPlugin('dist') 
  ]
}



   