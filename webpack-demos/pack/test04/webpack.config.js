
module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"production", 
  //单个入口文件
  entry: './main.js',
  //多个入口文件路径
  // entry: ['./main.js','./main2.js'],
  
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: './bundle.js' //默认dist目录下  
  },

  devServer: {
    public: '127.0.0.1:6789',
    port : "6789",
    

    open: true,// 自动打开浏览器
    //hot: true,// 开启热更新  

    contentBase: __dirname+'/dist',//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新


  }
};