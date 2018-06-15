
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: './main.js',
  output: {
    filename: './bundle.js'
  },
  plugins:[
    new htmlWebpackPlugin({
        filename:'./dist/index.html', //通过模板生成的文件名
        template:'index.html',//模板路径
        inject:true, //是否自动在模板文件添加 自动生成的js文件链接
        title:'这个是WebPack Demo',
        minify:{
            removeComments:true //是否压缩时 去除注释
        }
    })
  ]
};
