# HtmlWebpackPlugin
从名字我们就可以看出该plugin的作用，它主要是用来服务于HTML的。这个插件可以自动为我们生成HTML并插入对应的js和css文件。这样子是很方便的，尤其是当文件名中包含了hash值，而这个hash值在webpack每次编译的时候都会发生改变的。下面我们就逐一来介绍HtmlWebpackPlugin的用法。 
　

# 安装
使用npm安装：

> npm install --save-dev html-webpack-plugin

# option

## title
title表示生成html的标题，对于了解前端的来说是很熟悉的。

## filename
filename表示生成html文件的名字，如果没有设置的话默认为index.html。

## template
　　当webpack自动生成html文件的时候，会基于某个模板来进行。当然你也可以自定义自己的模板，如果没有定义webpack会使用默认的模板。但是需要指出的是，当你使用了其他模板类型（比如jade），那么你需要安装对应的loader。默认情况下webpack使用ejs模板。

## inject
inject主要是设置将js和css文件插入在html的哪个位置，由于js的加载时同步进行的，所以它的位置对网页的加载速度是有影响的。inject共有四个可选项：true、body、head和false。

true：默认值，将js文件插入body的底部。注意这里是bool类型的true，并不是字符串。设置如下： 
```
new HtmlWebpackPlugin({ 
　　inject: true 
}),
```
body：和true的功能是一样的。需要设置为字符串body。设置如下：
```
new HtmlWebpackPlugin({
    inject: 'body'
}),
```
head：表示将js文件插入在head标签内，这里是字符串head。
false：表示不插入生成的js文件，也不插入css文件。因为其他三个可选项css文件都是插入在head标签内的。
## minify
　　minify的作用是对生成的html文件进行压缩，其值是一个object或者false。默认是false，表示不对html文件进行压缩。如果赋值为object，用于对压缩方式进行配置，器配置项可以参考html-minifier 
。

## hash
hash的作用表示是否为插入的js和css文件添加hash值，默认为false。 
为文件添加hash对于文件缓存是很有帮助的，因为该hash值只有对应的文件发生改变的时候才会改变，当浏览器发现文件名没有改变的时候是不会重新请求文件的，而是从缓存里面去拿。

## chunks
大多数情况下Webpack的entry会有多个入口文件，如下：
```
entry: {
    vendor: Object.keys(pkg.dependencies),
    main: __dirname + '/app/main.js'
  },
```
　　这个时候，webpack在编译的时候会生成多个js文件（main.js/vendor.js），默认情况下会在html中添加所有的js和css文件。但有的时候我们并不想将多有的文件插入到生成的html中，而是有选择的添加我们需要的，这个时候就可以通过chunks来进行配置。 
例如，我们只想添加main.js/main.css，那么配置如下：
```
  plugins: [
    new HtmlWebpackPlugin({
      chunks:['main']
    })
  ]
```
这个时候，生成的html就会只包含main.js和main.css。

## excludeChunks
excludeChunks的作用刚好和chunks相反，它表示不添加哪些js/css文件。

# 插件的选项：title

title: 模板的标题
```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  mode:"development",
  plugins: [
    new HtmlWebpackPlugin({
      filename:'./index.html', //通过模板生成的文件名
        template:'./index.html',//模板路径
        inject:true, //是否自动在模板文件添加 自动生成的js文件链接的位置
        title:'这个是WebPack Demo',
        sss:"xxx",
        minify:{
          removeComments:true //是否压缩时 去除注释
        }
    })
  ]
}
 
```
注：除了title属性还自定义了sss属性，也可以输出到index.html中

index.html

```
<html>
    <head>
      <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
<body>
    <%= htmlWebpackPlugin.options.sss %>
</body>
</html>
```