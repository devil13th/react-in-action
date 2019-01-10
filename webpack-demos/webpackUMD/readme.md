# 目的
用webpack打包es6 成为UMD规范的组件 

```
output: {
    filename: './bundle.js', //默认dist目录下  

    library: "MyLibrary", // string,  导出库(exported library)的名称
    
    libraryTarget: "umd", // 通用模块定义
}
```