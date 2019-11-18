const webpack = require('webpack');

console.log("process.env.NODE_ENV：" + process.env.NODE_ENV);

module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"development", 
  //单个入口文件
  entry: './main.js',
  //多个入口文件路径
  // entry: ['./main.js','./main2.js'],
  
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: './bundle.js' //默认dist目录下  
  },

  plugins: [
    new webpack.DefinePlugin({
        OBJ: JSON.stringify({"key1": "this is value"}),
        OBJ2: JSON.stringify({"key1": "this is value"}),
        OBJ3: JSON.stringify({"key1": "'this is value'"}),
        ARRAY: JSON.stringify(["value1", "value2"]),
        ARRAY2: JSON.stringify(["value1", "value2"]),
        ARRAY3: JSON.stringify(["'value1'", "'value2'"]),
        ENV:JSON.stringify(process.env.NODE_ENV),
        // process:{
        //   evn : {
        //     NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        //   }
        // }
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    })
]

};