import "babel-polyfill";
import dva from 'dva';
import './index.css';

import listModel from './models/list';
import addModel from './models/add';
import testModel from './models/test';
import sysUserModel from './models/sysUserModel';
import router from './router';
import createLoading from 'dva-loading';

import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger();


// 1. Initialize
const app = dva({
  //中间件
  //onAction:[createLogger()],
  //extraReducers: { form: formReducer }
  initialState: {
    inputs: { input: 'devil13th' }
  },
});

app.model(listModel);
app.model(addModel);
app.model(testModel);
app.model(sysUserModel);

// 2. Plugins
// app.use({});
app.use(createLoading({})); // 开启loading  createLoading的参数opts 仅有一个 namespace 字段，默认为 loading。

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(router);

// 5. Start
app.start('#root');




