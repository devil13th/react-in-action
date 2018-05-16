module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }
};
