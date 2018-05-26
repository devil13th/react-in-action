import { createStore,compose,applyMiddleware } from 'redux'
import DevTools from '../containers/DevTools.js'
import todoApp from '../redux/reducers.js'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()

// ---------- 以下代码为加入中间件   
function configureStore(preloadedState) {
    return createStore(
        todoApp,
        preloadedState,
        compose(applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ), DevTools.instrument()
        )
    )
}
const store = configureStore({})
export default store;


//----------- 以下代码为没有加入中间件
/*
// 把多个 store 增强器从右到左来组合起来，依次执行
// 这个地方完全可以不用compose，演示一下compose的使用
const enhancer = compose(
    DevTools.instrument()
);
  

const store = createStore(todoApp,enhancer);

export default store;
*/