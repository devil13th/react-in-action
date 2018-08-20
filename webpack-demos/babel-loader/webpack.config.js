module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: './main.jsx',
  output: {
    filename: './bundle.js'
  },
  module: {
    rules: [
      { 
        test:/\.(js|jsx)$/, //匹配*.js或*.jsx文件
        exclude: /node_modules/, //不包含node_modules目录下的文件
        use: {
          loader: 'babel-loader', //
          options: {
            presets: ['es2015', 'react', 'stage-0'] //处理后的语法为es2015 react stage-0的标准
          }
        }
      }
    ]
  }
};
