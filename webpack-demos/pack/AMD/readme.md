# 目的
用webpack打包AMD规范的js 并查看打包结果(dist/bundle.js)

# 命令
切换到该目录下(test03)后执行

> npm run build

或编译后用浏览器浏览
> npm run start

然后访问index.html即可

# 目录说明
```
dist : 最终打包目录(不可删除，里面有index.html静态文件)
  |- index.html : 打包后可访问该页面进行测试
index.html : 无用--
ipt1.js:定义有依赖的模块
ipt2.js:定义模块
main.js:入口js
package.json:依赖包
readme.md:说明文档
webpack.config.js:webpack 配置文件
```
