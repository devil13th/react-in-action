const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
// __dirname是node.js的全局变量，它指向当前执行脚本所在的目录。
module.exports ={
  devtool: 'false',
  entry:[__dirname + '/../src/main.js'],

  entry: {
    main: path.join(__dirname, '/../src/main.js'),
  },


  output:{
    path:__dirname+'/../dist',
    chunkFilename: "[name].js",
    filename: "[name].js"
  },

  optimization: {
    runtimeChunk: {
        name: "manifest"
    },
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                priority: -20,
                chunks: "all"
            }
        }
    }
  },


  mode:'production', // 生产模式production  开发模式development
  devServer: {
    contentBase: __dirname+'/../dist',//本地服务器所加载的页面所在的目录
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
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin()
  ]

  

}