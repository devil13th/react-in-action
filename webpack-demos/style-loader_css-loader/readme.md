# style-loader

## 作用
将js使用import引入的css文件内容通过style的方式引入到页面中

main.js内容如下
```
import './app.css';
```

app.css内容如下
```
body {
  background-color: blue;
}

```

页面打开打包好的bundle.js后会创建style标签并将app.css内容放到该标签下  


转换成
```
<style type="text/css">body {
  background-color: blue;
}
</style>
```

## webpack.config.js配置如下：
```
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

```

