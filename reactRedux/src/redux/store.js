import { createStore,compose } from 'redux'
import DevTools from '../containers/DevTools.js'
import todoApp from '../redux/reducers.js'



// 把多个 store 增强器从右到左来组合起来，依次执行
// 这个地方完全可以不用compose，演示一下compose的使用
const enhancer = compose(
    DevTools.instrument()
);
  

const store = createStore(todoApp,enhancer);

export default store;