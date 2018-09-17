//整个应用的入口文件

//兼容低版本浏览器
import "babel-polyfill";
//dva 框架
import dva from 'dva';
//首页router
import router from './router';
//dva loading 组件
import createLoading from 'dva-loading';
//redux 日志组件
import { createLogger } from 'redux-logger'

//各个模块的model
import IndexModel from './models/IndexModel';

import './styles/style.css';


//创建日志中间件
const loggerMiddleware = createLogger();



// 1. Initialize
const app = dva({
    //中间件
    //onAction:[createLogger()],
    //extraReducers: { form: formReducer }
    initialState: {
      
    },
  });
  

  app.model(IndexModel);
  
  // 2. Plugins
  // app.use({});
  app.use(createLoading({})); // 开启loading  createLoading的参数opts 仅有一个 namespace 字段，默认为 loading。
  
  // 3. Model
  // app.model(require('./models/example'));
  
  // 4. Router
  app.router(router);
  
  // 5. Start
  app.start('#root');
  