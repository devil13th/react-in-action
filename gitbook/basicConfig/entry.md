# entry 

这里应用程序开始执行
webpack 开始打包



单一入口文件

```
entry: "./app/entry", // string | object | array
```

多个入口文件
```
entry: ["./app/entry1", "./app/entry2"],
```

多个入口文件
```
entry: {
	a: "./app/entry-a",
	b: ["./app/entry-b1", "./app/entry-b2"]
},
```

