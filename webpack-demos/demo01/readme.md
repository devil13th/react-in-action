[toc]  
*注：版本为webpack4.x*  
# webpack打包js

## 背景
现在一个应用使用的js非常多,如何将这些js文件打包成一个文件,或是为了减少文件大小，将这些文件压缩成一个js文件呢，我们可以使用webpack.  

例如main.js中引入了一个beImport.js 则我们可以把这两个js打包成一个文件 

配置如下
```
module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"development", 
  //入口文件路径
  entry: './main.js',
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: './bundle.js' //默认dist目录下  
  }
};
```

## 执行命令
执行webpack命令
> webpack

该命令默认的配置文件文件名称为 执行webpack命令时所处目录的webpack.config.js

我们可以看到生成的bundle.js文件已经包含了上面提到的两个js文件了。

## 多个文件入口
上面是单一入口文件，还可以将多个入口文件打包成一个文件
```

module.exports = {
  //mode:生产模式production(会压缩代码)  开发模式development(不会压缩代码)
  mode:"development", 
  //单个入口文件
  //entry: './main.js',
  //多个入口文件路径
  entry: ['./main.js','./main2.js'],
  
  //打包后的文件路径 (webpack4默认dist目录下)
  output: {
    filename: './bundle.js' //默认dist目录下  
  }
};
```
