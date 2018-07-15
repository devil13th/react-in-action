
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
    filename: '[name].js'
  },
  //入口文件路径
  //entry: './main.js',
  entry:{
    
    index: ['./main.js'],
  },
  optimization: {
    minimize: false,
    splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
    }
  },




/*
  //入口文件路径
  //entry: './main.js',
  entry:{
    
    vendor: [
        'react',
        'react-dom',
        'antd',
    ],
    

    index: ['./main.js'],
  },
  optimization: {
    minimize: false,
    splitChunks: {
        cacheGroups: {
            vendor: {
                chunks: 'initial',
                name: 'vendor1',
                test: 'vendor',
                enforce: true
            }
        }
    }
  },
*/



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
    new CopyWebpackPlugin([
      // to 默认的是dist文件夹是根目录
      { from: 'css/antd.css',to:'css/antd.css' },
    ]),
    //包引用分析
    new BundleAnalyzerPlugin({
      //  可以是`server`，`static`或`disabled`。
      //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
      //  在“静态”模式下，会生成带有报告的单个HTML文件。
      //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
      analyzerMode: 'server',
      //  将在“服务器”模式下使用的主机启动HTTP服务器。
      analyzerHost: '127.0.0.1',
      //  将在“服务器”模式下使用的端口启动HTTP服务器。
      analyzerPort: 8888, 
      //  路径捆绑，将在`static`模式下生成的报告文件。
      //  相对于捆绑输出目录。
      reportFilename: 'report.html',
      //  模块大小默认显示在报告中。
      //  应该是`stat`，`parsed`或者`gzip`中的一个。
      //  有关更多信息，请参见“定义”一节。
      defaultSizes: 'parsed',
      //  在默认浏览器中自动打开报告
      openAnalyzer: true,
      //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
      generateStatsFile: false, 
      //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
      //  相对于捆绑输出目录。
      statsFilename: 'stats.json',
      //  stats.toJson（）方法的选项。
      //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
      //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      logLevel: 'info'// 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
    })
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