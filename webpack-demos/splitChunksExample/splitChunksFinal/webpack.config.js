//拷贝首页，并添加js引用 、压缩、替换文本等功能
const HtmlWebpackPlugin = require('html-webpack-plugin')
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
//复制静态文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
//文件压缩
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//生成分析报告
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//压缩代码
//const CompressionPlugin = require("compression-webpack-plugin");


// __dirname是node.js的全局变量，它指向当前执行脚本所在的目录
console.log("----------- 当前目录 ----------------" );
console.log( __dirname );
var path = require("path");
var projectRoot = path.resolve(".");
console.log(". = %s", path.resolve("."));
console.log("__dirname = %s", path.resolve(__dirname));
console.log(path.resolve(__dirname, 'dist'));
console.log(path.resolve('./', 'dist'));



module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"production", 

  devtool: false,
  //devtool: 'eval-source-map',

  //单个入口文件
  entry: {
    entry: [__dirname + '/src/index.js'],
    antd:['antd'], // 打包后的antd.js包含了antd模块  以antd模块为入口
    dva:['dva'], // 打包后的dva.js包含了dva模块  以dva模块为入口
    react:['react','react-dom'] //打包后的react.js包含了react和react-dom模块  以react和react-dom模块模块为入口
  },
  optimization:{
    splitChunks: {
      cacheGroups: { //分组规则
        
        default: false,//禁用默认配置
        vendors: {  //cacheGroups中的key(cacheGroups的属性)的名称可以随意取名,无特殊作用  
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minSize:0,
          //priority: 29
          priority: 30,
          enforce:true
        },
        dva:{
          test:'dva',
          name:'dva',
          chunks: 'all',
          minSize:0, //单位字节,打包前的最小文件大小  满足该条件才会单独打包 默认大小为30000(30K)
          priority: 34, //优先级,数值越大优先级越高 
          enforce:true  //忽略SplitChunks.MinSize、SplitChunks.MinChunks、SplitChunks.MaxAsyncRequests和SplitChunks.MaxInitialRequests选项，并始终为此缓存组创建块。
        },
        antd:{
          test:'antd',
          name:'antd_',
          chunks: 'all',
          minSize:0,
          priority: 31,
          enforce:true
        },
        react:{
          test:'react',
          name:'react_',
          chunks: 'all',
          minSize:0,
          priority: 36,
          enforce:true
        },
        reactDom:{
          test:'react-dom',
          name:'react-dom_',
          chunks: 'all',
          minSize:0,
          priority: 35,
          enforce:true
        },
      }
    }
  },
  //不要进行打包的组件
  /*externals: {
    jquery: 'jQuery',
    antd:"antd",
    react:"react",
    dva:"dva",
    reactDom:"react-dom"
    //lodash: 'lodash'
  },*/
  
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    path: __dirname + '/dist',
    filename: '[name].js' //默认dist目录下   [name]为entry的属性值
  },

  devServer: {
    public: '127.0.0.1:7890',
    port : "7890",

    open: true,// 自动打开浏览器
    //hot: true,// 开启热更新  
    contentBase: __dirname+'/dist',//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    proxy: { //设置代理 
      
      /**
       * 凡是/ctx开头的请求均转到http://127.0.0.1:8080/
       * pathRewrite 将/ctx替换成/thd-ajaxserver
       * 
       * 例如:  /ctx/user/name
       * 将代理为 http://127.0.0.1:8080/ctx/user/name
       * pathRewrite属性将 /ctx替换为/thd-ajaxserver  
       * 最终的请求地址为 http://127.0.0.1:8080/thd-ajaxserver/user/name
       */
      '/ctx': {
        //target: 'http://127.0.0.1:8888/thd-ajaxserver',
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/ctx': '/thd-ajaxserver' // 重写请求，比如我们源访问的包含/ctx，那么请求会将/ctx替换为"thd-ajaxserver"  并在前面加入target属性值
        }
      },
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
        ],
        exclude: /node_modules/
      },

      //如果要编译打包less文件需要加如下内容
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ],
        exclude: /node_modules/
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
        ],
        exclude: /node_modules/
      }
    ]
  },


  plugins: [
    //清理文件夹
    new CleanWebpackPlugin('dist') ,
    //拷贝模板并添加js引用 替换模板变量
    new HtmlWebpackPlugin({
      filename:'./index.html', //通过模板生成的文件名
      template:'./index.html',//模板路径
      inject:true, //是否自动在模板文件添加 自动生成的js文件链接的位置 允许插件修改哪些内容，true/'head'/'body'/false,
      title:'这个是WebPack SplitChunk Demo',
      sss:"我是 webpack 配置文件中配置的变量,在HtmlWebpackPlugin插件中进行配置 hello world !",

      //minify属性详解：https://github.com/kangax/html-minifier#options-quick-reference
      minify:{
        removeComments:true ,//是否压缩时 去除注释
        minifyCSS:true,//是否压缩style 样式(在index.html中的样式非外部样式)
        minifyJS:true,//是否压缩直接出现在页面中的js
      }
    }),
    /*
    new CompressionPlugin({
      filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip',//算法
      test: new RegExp(
           '\\.(js|css)$'    //压缩 js 与 css
      ),
      threshold: 10240,//只处理比这个值大的资源。按字节计算
      minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
    }),
    */


    //拷贝静态资源
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/styles/antd.css',
        to: __dirname + '/dist'
      }
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

};