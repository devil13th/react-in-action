const eslintFormatter = require('react-dev-utils/eslintFormatter');
// __dirname是node.js的全局变量，它指向当前执行脚本所在的目录。
module.exports ={
  //devtool: 'cheap-module-source-map',
  devtool:'eval-source-map',
  entry:[__dirname + '/../src/index.js'],
  output:{
    path:__dirname+'/../public',
    filename:'bundle.js'
  },
  mode:'development', // 生产模式production  开发模式development
  devServer: {
    contentBase: __dirname+'/../public',//本地服务器所加载的页面所在的目录
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
            presets: ['es2015','react', 'stage-0']
          }
        },
       //use:['react-tools'],
        exclude:/node_modules/
      },

      /*{
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include:  __dirname+'/../src',
      },*/


      //如果要打包css文件需要加如下内容
     
      {
        test:/\.css$/,
        /*loaders:['style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]','css-loader']*/
        use: [
          { loader: "style-loader" },
          /*{ loader: "css-loader"}*/
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
      }

    ]
  }

}