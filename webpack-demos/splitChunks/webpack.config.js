const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')
module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"development", 
  //入口文件路径
  entry: './main.js',
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: 'bundle.js' //默认dist目录下  
  },

  optimization: {
    splitChunks: {
      chunks:'all'
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