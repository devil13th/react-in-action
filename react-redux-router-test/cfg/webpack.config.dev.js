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
  }

}