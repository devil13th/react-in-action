const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        inject:true, //是否自动在模板文件添加 自动生成的js文件链接的位置
        title:'这个是WebPack Demo',
        sss:"xxx",
        minify:{
          removeComments:true //是否压缩时 去除注释
        }
    })
  ]
}



   