//拷贝首页，并添加js引用 、压缩、替换文本等功能
const HtmlWebpackPlugin = require('html-webpack-plugin')
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
//文件拷贝功能
const CopyWebpackPlugin = require('copy-webpack-plugin');

// __dirname是node.js的全局变量，它指向当前执行脚本所在的目录。
module.exports = {
  //devtool: 'cheap-module-source-map',
  //devtool:false,
  devtool: 'eval-source-map',
  entry: [__dirname + '/../src/index.js'],

  output: {
    path: __dirname + '/../dist',
    filename: 'bundle.js'
  },
  mode: 'development', // 生产模式production  开发模式development
  devServer: {
    public: '127.0.0.1:8002',
    port: "8002",
    open: true,// 自动打开浏览器
    //hot: true,// 开启热更新
    contentBase: __dirname + '/../dist',//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    proxy: { //设置代理 
      '/proxy': {
        //target: 'http://127.0.0.1:8888/sbt',
        target: 'http://127.0.0.1:8000/vh',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '' //代理路径
        }
      },
      '/jobengine': {
        target: 'http://192.168.248.92:8430/jobengine',
        changeOrigin: true,
        pathRewrite: {
          '^/jobengine': '' //代理路径
        }
      }
    },
  },


  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-0']
          }
        },
        //use:['react-tools'],
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        /*loaders:['style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]','css-loader']*/
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        ]
      },

      //如果要编译打包less文件需要加如下内容
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      },
      //图片打包
      {
        test: /\.(png|gif|jpg|svg|jpeg)$/i, //匹配所有图片,后缀忽略大小写
        //test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, //byte为单位
              outputPath: "img" //输出文件夹
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html', //通过模板生成的文件名
      template: './index.html',//模板路径
      inject: true, //是否自动在模板文件添加 自动生成的js文件链接的位置 允许插件修改哪些内容，true/'head'/'body'/false,
      title: 'Dva Demo',
      sss: "hello world !",

      //minify属性详解：https://github.com/kangax/html-minifier#options-quick-reference
      minify: {
        removeComments: true,//是否压缩时 去除注释
        minifyCSS: true,//是否压缩style 样式(在index.html中的样式非外部样式)
        minifyJS: true,//是否压缩直接出现在页面中的js
      }
    }),
    new CleanWebpackPlugin('dist'),
   
    new CopyWebpackPlugin([
      {
        from: __dirname + '/../public/antd.css',
        to: __dirname + '/../dist'
      },{
        from: __dirname + '/../public/style.css',
        to: __dirname + '/../dist'
      }
    ])

  ]


}