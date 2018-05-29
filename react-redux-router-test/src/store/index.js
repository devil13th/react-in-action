/*import reducers from '../reducers';
import { createStore,compose  } from 'redux';
import DevTools from '../container/DevTools'


const enhancer = compose(
    DevTools.instrument()
);
  
const store = createStore(reducers, enhancer);

export default store; */



import reducers from '../reducers';
import { createStore,compose,applyMiddleware } from 'redux'
import DevTools from '../container/DevTools'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger();


// ---------- 以下代码为加入中间件   
function configureStore(preloadedState) {
  return createStore(
      reducers,
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