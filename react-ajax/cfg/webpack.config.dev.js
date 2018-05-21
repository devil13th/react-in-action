// __dirname是node.js的全局变量，它指向当前执行脚本所在的目录。
module.exports ={
  devtool: 'false',
  entry:[__dirname + '/../src/index.js'],
  output:{
    path:__dirname+'/../dist',
    filename:'bundle.js'
  },
  mode:'production', // 生产模式production  开发模式development
  devServer: {
    // ----------- ajax proxy ---------
    proxy: {
      '/proxy': {
          target: 'http://127.0.0.1:8000/devil13th',
          changeOrigin: true,
          pathRewrite: {
              '^/proxy': ''
          }
      }
    },



    contentBase: __dirname+'/../dist',//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    port: 8001//端口号

 
/*
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    
    host: '10.0.0.9',
    proxy: {
    '/test/*': {
    target: 'http://localhost',
    changeOrigin: true,
    secure: false
*/


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
      },
      //如果要打包css文件需要加如下内容
     
      {
        test:/\.css$/,
        loaders:['style-loader','css-loader']
      },

      //如果要编译打包less文件需要加如下内容
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }

    ]
  }

}