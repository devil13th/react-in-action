[TOC]

# 代码示例

```
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
    public: '127.0.0.1:8001',
    port: "8001",
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
   
    new CopyWebpackPlugin([{
          from: __dirname + '/../public/img',
          to: __dirname + '/../dist/img'
      },{
        from: __dirname + '/../public/antd.css',
        to: __dirname + '/../dist'
      },{
        from: __dirname + '/../public/style.css',
        to: __dirname + '/../dist'
      }
    ])

  ]


}
```



# package.json

```
{
  "private": true,
  "scripts": {
    "build": "webpack --config cfg/webpack.config.dev.js",
    "start": "webpack-dev-server --config ./cfg/webpack.config.dev.js"
  },
  "engines": {
    "install-node": "6.9.2"
  },
  "dependencies": {
    "antd": "^3.7.1",
    "babel-plugin-import": "^1.1.1",
    "babel-runtime": "^6.9.2",
    "dva": "^2.4.0",
    "dva-loading": "^2.0.3",
    "react": "^15.4.0",
    "react-dom": "^15.4.0",
    "redux-logger": "^3.0.6"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-eslint": "^7.1.1",
    "babel-loader": "^7.1.4",
    "babel-plugin-dva-hmr": "^0.3.2",
    "babel-plugin-transform-runtime": "^6.9.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "clean-webpack-plugin": "^0.1.19",
    "copy-webpack-plugin": "^4.5.2",
    "css-loader": "^0.28.11",
    "eslint": "^3.12.2",
    "eslint-config-airbnb": "^13.0.0",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-jsx-a11y": "^2.2.3",
    "eslint-plugin-react": "^6.8.0",
    "expect": "^1.20.2",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.2.0",
    "husky": "^0.12.0",
    "less": "^3.0.4",
    "less-loader": "^4.1.0",
    "open-browser-webpack-plugin": "0.0.5",
    "redbox-react": "^1.3.2",
    "roadhog": "^0.5.2",
    "uglifyjs-webpack-plugin": "^1.3.0",
    "webpack": "^4.6.0",
    "webpack-bundle-analyzer": "^2.13.1",
    "webpack-cli": "^2.1.2",
    "webpack-dev-server": "^3.1.4"
  }
}

```

