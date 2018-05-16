module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
};
