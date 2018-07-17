import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  initialState: {
    inputs: { input: 'devil13th' }
  },
});

app.model(require('./models/list'));
app.model(require('./models/add'));

// 2. Plugins
// app.use({});
app.use(createLoading({})); // 开启loading  createLoading的参数opts 仅有一个 namespace 字段，默认为 loading。

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
