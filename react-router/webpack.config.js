//拷贝首页，并添加js引用 、压缩、替换文本等功能
const HtmlWebpackPlugin = require('html-webpack-plugin')
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
//复制静态文件
const CopyWebpackPlugin = require('copy-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// __dirname是node.js的全局变量，它指向当前执行脚本所在的目录。
module. exports ={
  devtool: 'eval-source-map',
  entry:[__dirname + '/src/index.js'],
  output:{
    path:__dirname+'/dist',
    filename:'bundle.js'
  },
  mode:'development', // 生产模式production  开发模式development
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
  
  ,
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        },
       //use:['react-tools'],
        exclude:/node_modules/
      }
        　　
    ]
  },


  plugins: [
    new HtmlWebpackPlugin({
      filename:'./index.html', //通过模板生成的文件名
        template:'./index.html',//模板路径
        inject:true, //是否自动在模板文件添加 自动生成的js文件链接的位置 允许插件修改哪些内容，true/'head'/'body'/false,
        title:'这个是WebPack Demo',
        sss:"hello world !",

        //minify属性详解：https://github.com/kangax/html-minifier#options-quick-reference
        minify:{
          removeComments:true ,//是否压缩时 去除注释
          minifyCSS:true,//是否压缩style 样式(在index.html中的样式非外部样式)
          minifyJS:true,//是否压缩直接出现在页面中的js
        }
    }),
    new CleanWebpackPlugin('dist') ,

    new CopyWebpackPlugin([
      // to 默认的是dist文件夹是根目录
      { from: './nav.css',to:'./nav.css' },
    ])


  ]


}