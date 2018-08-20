[toc]
# url-loader
## 为什么使用url-loader

如果我们希望在页面引入图片（包括img的src和background的url）。当我们基于webpack进行开发时，引入图片会遇到一些问题。

其中一个就是引用路径的问题。拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

另外，如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。

url-loader和file-loader是什么关系呢？简答地说，url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。通过上面的介绍，我们可以看到，url-loader工作分两种情况：1.文件大小小于limit参数，url-loader将会把文件转为DataURL；2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。

## 使用方式
该loader可以将图片以模块的形式在js中进行引入。例如

```js
import React from 'react';
import ReactDOM  from 'react-dom';

import img1 from './images/big.png';
import img2 from './images/small.png';

alert(img1);
alert(img2);

ReactDOM.render(
  <div>
    <img src={img1}/>
    <img src={img2}/>
  </div>,
  document.getElementById('example')
);
```

上例中引入了2张图片, images/big.png和 images/small.png 

## webpack.config.js配置
```
module.exports = {
  mode:"development", 
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: [          
          {
            loader: 'url-loader',
            options: {
              limit: 8192,//byte为单位,超过此单位将拷贝到相应目录下(默认是dist) , 如果没超过次大小将用data:image/jpg;base64...的形式引入图片
              outputPath:"img" //超过limit设置大小的图片将放到文件夹  dist/img
            }
          }
        ]
      }
    ]
  }
};

```

## 参数配置

options中的参数如下：
`name`:表示输出的文件名规则，如果不添加这个参数，输出的就是默认值：文件哈希。加上[path]表示输出文件的相对路径与当前文件相对路径相同，加上[name].[ext]则表示输出文件的名字和扩展名与当前相同。加上[path]这个参数后，打包后文件中引用文件的路径也会加上这个相对路径。

`limit`:byte为单位,超过此单位将拷贝到相应目录下(默认是dist) , 如果没超过次大小将用data:image/jpg;base64...的形式引入图片  
 `outputPath`:表示输出文件路径前缀。图片经过url-loader打包都会打包到指定的输出文件夹下。但是我们可以指定图片在输出文件夹下的路径。比如outputPath=img/，图片被打包时，就会在输出文件夹下新建（如果没有）一个名为img的文件夹，把图片放到里面。


编译后的代码如下：
```
<img src="img/4853ca667a2b8b8844eb2693ac1b2578.png">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...">
```
可以看到较小的图片已经使用base64进行编码后将该编码直接返回  
较大的图片放到了`outputPath`配置的目录下





