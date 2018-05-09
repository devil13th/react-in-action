// __dirname是node.js的全局变量，它指向当前执行脚本所在的目录。
module. exports ={
  devtool: 'eval-source-map',
  entry:[__dirname + '/src/main.js',__dirname + '/src/msg.js',__dirname + '/src/div.js'],
  output:{
    path:__dirname+'/dist',
    filename:'bundle.js'
  },
  mode:'development', // 生产模式production  开发模式development
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
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
        loaders:['style-loader','css-loader'],
        exclude:/node_modules/
      },

      {
　　　　　　test: /\.(png|jpg|gif)$/,
          loader:'url-loader',
          options: { 
            limit:20000,//当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
            outputPath: 'images/',// 指定打包后的图片位置
            name:'[name].[ext]?[hash]',//name:'[path][name].[ext]
            publicPath:'images/'

          },
          exclude:/node_modules/
　　　　},

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ],
        exclude:/node_modules/
      },
      
　　　　
      {
        test: /\.less$/,
        use: [{
              loader: "style-loader" 
            },{
                loader: "css-loader" 
            },{
                loader: "less-loader"
            }],
        exclude:/node_modules/
      }
        　　
    ]
  }
}