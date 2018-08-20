[toc]

*注：版本为webpack4.x*
# babel-loader 的使用

将es6,jsx语法转换为es2015和react的语法，目的是让低版本浏览器可执行编写的js  

来看一下main.jsx，文件内容如下：

```
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);

const es6fun = () => {
  alert(1)
}

const es6obj = {a:1,b:2}
const es6obj2 = {...es6obj,c:3}

const es6arrOperater = [1,2,3,4,5,6];
const bbbb = [...es6arrOperater,7];


class Es6class {
  constructor(){
    alert("constructor");
  }

  toString(){
    return "1234"
  }
}

```
如果是低版本的IE，上面代码是不能运行的,所以要用babel将一些高级语法转换成低版本浏览器可执行的语法。以下是使用babel-loader的方法

## 先要安装react 和 stage-0

> npm install react --save-dev
> npm install babel-preset-stage-0 --save-dev


## webpack.config.js配置如下：
```
module.exports = {
  //mode:生产模式production  开发模式development
  mode:"development", 
  entry: './main.jsx',
  output: {
    filename: './bundle.js'
  },
  module: {
    rules: [
      { 
        test:/\.(js|jsx)$/, //匹配*.js或*.jsx文件
        exclude: /node_modules/, //不包含node_modules目录下的文件
        use: {
          loader: 'babel-loader', //
          options: {
            presets: ['es2015', 'react', 'stage-0'] //处理后的语法为es2015 react stage-0的标准
          }
        }
      }
    ]
  }
};

```





babel-loader的presets的设置有一定的顺序。es2015必须出现在stage-0前面，我记得这是因为es2015是ES6的标准，state-0等是对ES7一些提案的支持, state-0为包含了es7最新的一些功能，state-1、2、3都只包含了部分功能。

如果位子顺序颠倒的话，那么转码不成功，webpack打包失败。

关于state-0，如果不加state-0，presets里只有es2015的话，那么最起码的react class中的箭头函数都不支持,扩展运算符(...)不支持。

例如：
```
react: 将jsx语法转换为 react.createClass(...)
es2015: 将es6语法转换为es5
stage-0: 例如将对象的扩展运算符转换为es5的语法
```

执行命令如下：
> webpack

可以看到最终打包好的bundle.js中有关es6 和 jsx的语法都已经转换为低版本浏览器可执行的代码
