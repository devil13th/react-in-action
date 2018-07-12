const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')
module.exports = {
  //devtool:'eval-source-map',
  
  //入口文件路径
  entry: './main.js',
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: 'bundle.js' //默认dist目录下  
  },
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"production", 
  devServer:{
    contentBase:__dirname + "/dist/",
    port:8080,
    compress:true,// 服务器压缩
    open:true,// 自动打开浏览器
    inline: true,//实时刷新
    //hot:true//热更新
  },
  optimization: {
    minimize:false, //是否压缩代码
    
    
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 1,
      /*maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      //name: true,*/
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name:"a/vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          chunks: 'initial',
          name:"b/default",
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },

    runtimeChunk:true
  },
  
  

/*
  plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-cli'
    }),
  ],

*/
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
  }
};