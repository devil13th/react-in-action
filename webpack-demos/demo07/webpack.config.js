var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};
