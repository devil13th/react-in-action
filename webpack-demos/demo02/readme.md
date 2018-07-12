# 多个入口文件打包成多个出口文件

```
module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: './[name].bundle.js'
  }
};

```

output.filename中的[name]为entry对象的属性名称(bundle1,bundle2)