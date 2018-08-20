# output 

 // webpack 如何输出结果的相关选项

```
output: {

    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    
    filename: "bundle.js", // string
    filename: "[name].js", // 用于多个入口点(entry point)（出口点？）
    filename: "[chunkhash].js", // 用于长效缓存
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）


    publicPath: "/assets/", // string
    publicPath: "",
    publicPath: "https://cdn.example.com/",
    // 输出解析文件的目录，url 相对于 HTML 页面
    
    library: "MyLibrary", // string,
    // 导出库(exported library)的名称
    
    libraryTarget: "umd", // 通用模块定义
    libraryTarget: "umd2", // 通用模块定义
    libraryTarget: "commonjs2", // exported with module.exports
    libraryTarget: "commonjs-module", // 使用 module.exports 导出
    libraryTarget: "commonjs", // 作为 exports 的属性导出
    libraryTarget: "amd", // 使用 AMD 定义方法来定义
    libraryTarget: "this", // 在 this 上设置属性
    libraryTarget: "var", // 变量定义于根作用域下
    libraryTarget: "assign", // 盲分配(blind assignment)
    libraryTarget: "window", // 在 window 对象上设置属性
    libraryTarget: "global", // property set to global object
    libraryTarget: "jsonp", // jsonp wrapper
    // 导出库(exported library)的类型
    
},

```
