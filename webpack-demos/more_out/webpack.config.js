const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  /*
  eval： 生成代码 每个模块都被eval执行，并且存在@sourceURL
  例如:eval("document.write('<h1>Hello World!</h1>');\r\n\n\n//# sourceURL=webpack:///./main1.js?");
  cheap-eval-source-map： 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl
  例如:eval("document.write('<h1>Hello World!</h1>');\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJ...==\n//# sourceURL=webpack-internal:///./main1.js\n
  cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能
  eval-source-map： 原始代码 同样道理，但是最高的质量和最低的性能
  cheap-source-map： 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用
  cheap-module-source-map： 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射
  source-map： 原始代码 最好的sourcemap质量有完整的结果，但是会很慢
  */
  devtool:'eval-source-map',
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: './[name]-[hash].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin('dist') 
  ]
};
