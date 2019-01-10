# 目的
用webpack打包es6 import export 并查看打包结果(dist/bundle.js)

# 命令
切换到该目录下(test01)后执行

> npm run build

然后访问index.html即可

# 目录说明
```
dist : 最终打包目录(可删除)
index.html : 打包后可访问该页面进行测试
ipt1.js:定义有依赖的模块
ipt2.js:定义模块
main.js:入口js
package.json:依赖包
readme.md:说明文档
webpack.config.js:webpack 配置文件
```
