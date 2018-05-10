import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore,compose } from 'redux'
import todoApp from './redux/reducers.js'
import App from './components/App.js'
import DevTools from './containers/DevTools.js'


// 把多个 store 增强器从右到左来组合起来，依次执行
// 这个地方完全可以不用compose，演示一下compose的使用
const enhancer = compose(
  DevTools.instrument()
);

let store = createStore(todoApp,enhancer);
render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
)

/*let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)*/