[toc]  
*注：版本为webpack4.x*  
# webpack 将多个模块引用的相同的JS打包成一个文件

例如
main.js  引入了 beImportA.js、
main2.js 引入了beImportA.js、beImportB.js
main3.js 引入了beImportA.js、beImportB.js、beImportC.js

beImportA.js、beImportB.js、beImportC.js 都引用了beImportD.js

beImportA.js被引用了3次
beImportB.js被引用了2次
beImportC.js被引用了1次
beImportD.js被引用了3次


按照配置文件中的内容
```
optimization:{
    splitChunks: {
      cacheGroups: { 
        common: {
          //表示模块被import的最小次数,例如某个js被import至少2次的会打到这个包中
          minChunks: 2,

          //maxInitialRequests:2,
          //改组打包后的文件名称
          name:'commons',

          chunks: 'all',
          priority: 10, //优先级
          reuseExistingChunk: true,
          enforce: true
        },
        common3: {
          //表示模块被import的最小次数,例如某个js被import至少2次的会打到这个包中
          minChunks: 3 ,

          //maxInitialRequests:2,
          //改组打包后的文件名称
          name:'commons3',

          chunks: 'all',
          priority: 20, //优先级
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
  ```

  分为了2个cacheGroup 分别是common 和 common3 ,但是common3的优先级是20,高于common(优先级是10),所以按照这两个分组的minChunks配置,被引用3次或以上的打包到common3(beImportA和beImportA),被引用2次或以上的打包到common(beImportD),一次或以下的打包到引用文件中(beImportC)
