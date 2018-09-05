# 外部引用react.js
html中使用script标签引用react等第三方JS后 将业务代码单独打包后引入html

# 如何兼容IE
1. 加入polyfill.js
2. webpack中使用babel



# 运行

将indexReactOnly.html 或 indexWithAntd.html内容复制到index.html中后执行

> npm run build

然后直接打开dist目录下的index.html 

或者直接运行

> npm run start

后自动打开浏览器