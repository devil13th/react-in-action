//拷贝首页，并添加js引用 、压缩、替换文本等功能
const HtmlWebpackPlugin = require('html-webpack-plugin')
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"development", 
  //单个入口文件
  entry: './main.js',
  //多个入口文件路径
  // entry: ['./main.js','./main2.js'],
  
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: './bundle.js', //默认dist目录下  

    library: "MyLibrary", // string,  导出库(exported library)的名称
    
    libraryTarget: "umd", // 通用模块定义
    // libraryTarget: "umd2", // 通用模块定义
    // libraryTarget: "commonjs2", // exported with module.exports
    // libraryTarget: "commonjs-module", // 使用 module.exports 导出
    // libraryTarget: "commonjs", // 作为 exports 的属性导出
    // libraryTarget: "amd", // 使用 AMD 定义方法来定义
    // libraryTarget: "this", // 在 this 上设置属性
    // libraryTarget: "var", // 变量定义于根作用域下
    // libraryTarget: "assign", // 盲分配(blind assignment)
    // libraryTarget: "window", // 在 window 对象上设置属性
    // libraryTarget: "global", // property set to global object
    // libraryTarget: "jsonp", // jsonp wrapper
  },

  devServer: {
    public: '127.0.0.1:6789',
    port : "6789",
    

    open: true,// 自动打开浏览器
    //hot: true,// 开启热更新  

    contentBase: __dirname+'/dist',//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新


  },
  plugins: [
    //清理文件夹
    new CleanWebpackPlugin('dist') ,
    //拷贝模板并添加js引用 替换模板变量
    new HtmlWebpackPlugin({
      filename:'./index.html', //通过模板生成的文件名
      template:'./index.html',//模板路径
      inject:true, //是否自动在模板文件添加 自动生成的js文件链接的位置 允许插件修改哪些内容，true/'head'/'body'/false,
     

      //minify属性详解：https://github.com/kangax/html-minifier#options-quick-reference
      minify:{
        removeComments:true ,//是否压缩时 去除注释
        minifyCSS:true,//是否压缩style 样式(在index.html中的样式非外部样式)
        minifyJS:true,//是否压缩直接出现在页面中的js
      }
    }),
   


  ],
};