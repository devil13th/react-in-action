//拷贝首页，并添加js引用 、压缩、替换文本等功能
const HtmlWebpackPlugin = require('html-webpack-plugin');
//该插件功能是打包前先清空目标文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 拷贝文件
const CopyWebpackPlugin =  require('copy-webpack-plugin');
// 分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// __dirname是node.js的全局变量，它指向当前执行脚本所在的目录。
module.exports ={
  //devtool: 'cheap-module-source-map',
  //devtool:false,
  devtool:'eval-source-map',
  entry:[__dirname + '/../src/index.js'],
  
  output:{
    path:__dirname+'/../dist',
    filename:'bundle.js'
  },
  mode:'development', // 生产模式production  开发模式development
  devServer: {
    public: '127.0.0.1:8001',
    port : "8001",
    open: true,// 自动打开浏览器
    //hot: true,// 开启热更新  
    contentBase: __dirname+'/../public',//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },

  
  module:{

    rules:[
     
      {
        test:/\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react', 'stage-0' ]
          }
        },
       //use:['react-tools'],
        exclude:/node_modules/
      },

      {
        test:/\.css$/,
        /*loaders:['style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]','css-loader']*/
        use: [
          { loader: "style-loader" },
          { loader: "css-loader",
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
              outputPath:"img" //输出文件夹
            }
          }
        ]
      }
      
    ]
  },


  plugins: [
    new HtmlWebpackPlugin({
      filename:'./index.html', //通过模板生成的文件名
        template:'src/index.html',//模板路径
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
    new CleanWebpackPlugin('dist') ,


/*
from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
to      定义要拷贝到的目标目录     from: __dirname + ‘/dist’
toType  file 或者 dir         可选，默认是文件
force   强制覆盖先前的插件           可选 默认false
context                         可选 默认base context可用specific context
flatten 只拷贝文件不管文件夹      默认是false
ignore  忽略拷贝指定的文件           可以用模糊匹配
*/
    new CopyWebpackPlugin([
      {
        from:'css' ,//将css目录下的文件拷贝到dist目录下的css目录(dist目录是默认的)
        to:'css' 
      },
      /*{
        from:'src/index.html',
        to:"index.html" //默认dist目录下 dist/index.html
      },*/
      {
        from:'src/html'
      }
    ]),


    //分析工具
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

  ]
  

}