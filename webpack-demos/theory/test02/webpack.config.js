
//拷贝首页，并添加js引用 、压缩、替换文本等功能
const HtmlWebpackPlugin = require('html-webpack-plugin')
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
//复制静态文件
const CopyWebpackPlugin = require('copy-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//生成分析报告
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, ''),
};


module.exports = {
  devtool:'eval-source-map',
  
  
  //打包后的文件路径 (webpack4默认dist目录下)
  /*output: {
    filename: 'bundle.js' //默认dist目录下  
  },*/
  output: {
    path: PATHS.build+'/dist',
    filename: '[name].js',
    chunkFilename:'[name].js'
  },
  //入口文件路径
  //entry: './main.js',
  entry:{
    bundle: ['./main.js']
  },


  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"development", 
  devServer:{
    contentBase:__dirname + "/dist/",
    port:8080,
    compress:true,// 服务器压缩
    open:true,// 自动打开浏览器
    inline: true,//实时刷新
    //hot:true//热更新
  },
  
  


  plugins: [
    //清理文件夹
    new CleanWebpackPlugin('dist') ,
    //拷贝模板并添加js引用 替换模板变量
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
    //拷贝静态资源
    /*new CopyWebpackPlugin([
      // to 默认的是dist文件夹是根目录
      { from: 'css/antd.css',to:'css/antd.css' },
    ]),*/
 
  ],


  module: {
    rules:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'] //处理后的语法为es2015 react stage-0的标准
          }
        }
      }
    ]
  },
/*
  externals: {
    React: 'react',
    ReactDOM:'react-dom',
    antd:'antd'
  }*/
};