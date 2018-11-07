[TOC]

# Npm 多模块依赖解决方案

> lerna 教程  多模块依赖

# 一、问题

以电商后管系统为例，有三个项目：

- 商品项目：mail-goods
- 订单项目：mail-order
- 集成项目：mail-integration

其中：mail-integration 项目依赖 mail-goods 和 mail-order。我们称 mail-integration 为 `集成项目`，mail-goods 和 mail-order 为 `底层依赖项目`。

如果商品项目（mail-goods）的代码有改动，需要经过以下几个步骤才能在集成项目（mail-integration）中看到效果：

- mail-goods 原本版本号为 1.0.0，修改 mail-goods 的代码；
- 修改 mail-goods 版本号为 1.1.0，发布最新包：`npm publish`；
- 切换到 mail-integration 目录下，更新高版本的 mail-goods：`npm install mail-goods@1.1.0`；
- 重新运行 mail-integration，才可以看到 mail-goods 中修改的代码效果。

这样做有几个问题：

- 即便底层依赖包 mail-goods 只是修改了一个字符，也要经过 publish、install 操作，过程繁琐；
- Npm 公共仓库 publish 不能发布同版本的包，也就是说每次 publish 都必须升级底层依赖包的版本号，不利于版本的管理。

为了解决上面的问题，经过调研，有三个方案可以解决问题，下面一一介绍。

# 二、方案一：[lerna](https://github.com/lerna/lerna#readme) 

很多开源项目都用到了 lerna 做多模块依赖管理，如：dva、umi。如果第一次接触 lerna，可以动手操作一下下面的步骤感受一下 lerna 是如何优雅的解决多模块依赖问题。

#### 1）安装全局包 lerna

```
$ npm install lerna -g
```

#### 2）初始化 lerna 项目

```
$ mkdir test-lerna 
$ cd test-lerna
$ lerna init
```

会生成如下目录：

```
|-- test-lerna
  |-- packages/
  |-- lerna.json
  |-- package.json
```

所有子包都放到 packages/ 目录下面统一管理。

#### 3）补充目录结构

在 test-lerna/packages 目录下新建 test1 和 test2 两个子模块，分别创建 package.json 文件。

```
test-lerna
  |- packages
       |- test1
            |- index.js
            |- package.json
            |- test.js
       |- test2
            |- node_modules
            |- index.js
            | package.json
       |- lerna.json
       |- package.json
```



修改 test2 子模块的 `package.json`，添加配置依赖 test1 子模块。

```
{
  "name": "test2",
  "version": "1.0.0",
  // ....
  "dependencies": {
    "test1": "^1.0.0"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

在 /test-lerna 目录下执行 `$ lerna bootstrap` 安装依赖包，注意这里不是 `$ npm install`，因为 test2 依赖了 test1，去 test2 目录下可以看到出现了 node_modules 目录，可以看到 test1 目录被加载进来了(这里的 test1 其实相当于是个快捷方式而已)，但到目前为止我们压根没有将 test1 提交到 npm 远程仓库。

#### 4）添加文件内容

test-lerna/packages/test1/index.js

```
function sum (a, b) {
    return Number(a) + Number(b);
}

module.exports = sum;
```

test-lerna/packages/test1/test.js，运行该脚本确保 test1 内容是正确的。

```
var sum = require('./index');

console.log(sum(1, 2));
```

test-lerna/packages/test2/index.js，引入 test1 包并调用它的方法，测试运行完全 ok。

```
var sum = require('test1');

console.log(sum(1, 2));
```

#### 5）修改 test1 包

修改 test-lerna/packages/test1/index.js 文件，添加一段打印信息。

```
function sum (a, b) {
    console.log('xixihaha');
    return Number(a) + Number(b);
}

module.exports = sum;
```

重新执行 test2 包下的 index.js，发现也能打印出 `xixihaha`，都不需要发布 test1 包，test1 修改，及时生效。

#### 6）总结

使用 lerna，不需要频繁的提交底层依赖包，就可看到底层依赖包的修改效果，其机制是创建底层依赖包的快捷方式(linux中叫做软链接)放到集成项目的 node_modules 目录下，由于是快捷方式，当底层依赖包有修改时，快捷方式内的内容也会相应修改。

当然，lerna 要求有依赖关系的包都必须放到 pacakges 目录下，如果受不了这种强制要求，可以跳转方案三。

# 三、方案二：npm 私有仓库

Npm 公共仓库对于同一个包的同一个版本是不允许重复发布的，这是出于安全方面考虑。

dk 用 `react 1.0.0` 包运行的程序目前跑的很稳定，如果 Npm 公共仓库能上传相同版本的包，指不定 react 哪个马虎的工作人员提交了个有 bug 的代码，并同时 publish 了 `react 1.0.0` 这个包，dk 这边的程序就会报错，又无从查起，命名包的版本都一样，为什么昨天晚上跑的还正常，今天跑起来就会报错呢？

有的公司会搭建供内部使用的 Npm 私有仓库，常用的开源软件是 Nexus，感兴趣的可以自行学习一波。私有仓库通过设置可以允许上传同版本的 npm 包。

mail-goods 版本为 1.0.0，现在修改了代码，可以重复 publish `mail-goods 1.0.0` 这个包，mail-integration 只需要强制更新（包的版本不变，包内容变化）一下 mail-goods 包的内容即可 `npm install mail-goods -f`。

这样做可以解决底层依赖包版本更新太快的问题，但没法解决每次修改底层包都要 publish > install 的繁琐操作。

# 四、方案三：npm install <folder>

`npm install <folder>` 这里的 folder 是底层依赖包的绝对路径，也就是有盘符的路径，如：'D://work/test1' 这种。

这种方案底层机制和方案一 lerna 很像，也是创建快捷方式（linux中叫做软链接）放到集成项目的 node_modules 下，较 lerna 灵活的一点是不必按照 lerna 要求有依赖关系的包必须放到 pacakges 目录下，而是可以是任意目录。

dk 实际使用 `npm install <folder>` 发现有几个需要注意的事项，列举如下：

- 底层依赖包和继承项目包可能有共同的依赖，如都用到了 react，此时可能会报一个 react 的错误，错误原因是检查有多个版本的 react 包，解决方法为定义别名指定使用集成项目下的 react 依赖（webpack 和 roadhog 构建工具可以设置别名，其它构建工具不清楚）

```
alias: {
    // ....
    react: path.join(__dirname, 'node_modules', 'react')
},
```

-  `npm install <folder> --no-save`，加上 `--no-save` 不会修改 package.json 和 package-lock.json 文件，你可以分别测试一下不加参数和加参数安装之后 package.json 和 package-lock.json 里的区别。

 

 

 

 

 