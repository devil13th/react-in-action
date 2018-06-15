module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
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
      },
      {
        test: /\.less$/,  //编译less文件
        use: [
          {loader: "style-loader"}, 
          {loader: "css-loader"}, 
          {loader: "less-loader"}
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
             loader: 'css-loader',
             options: {
               modules: true
             }
          }
        ]
      },
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
};
