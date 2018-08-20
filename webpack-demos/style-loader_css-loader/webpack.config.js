module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader"}
        ],
        exclude:/node_modules/
      },
    ]
  }
};



