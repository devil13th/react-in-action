[toc]  
*注：版本为webpack4.x*  
# webpack 将多个模块引用的相同的JS打包成一个文件

例如
main.js引入了 beImportA.js、beImportB.js、beImportC.js
main2.js 引入了beImportA.js、beImportB.js

beImportA.js被引用了2次
beImportB.js被引用了2次
beImportC.js被引用了1次

可以将引入次数大于等于2的文件(上例中的beImportA.js、beImportB.js) 打到单独一个JS中
