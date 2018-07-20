

module.exports = {
  devtool:'eval-source-map',
  
  
  

  
  //入口文件路径
  entry: './src/index.js',
  
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: 'bundle.js' //默认dist目录下  
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
  
  




  module: {
    rules:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react'] //处理后的语法为es2015 react stage-0的标准
          }
        }
      }
    ]
  }
};