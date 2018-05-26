import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools.js'
import store from './redux/store'
import App from './components/App.js'
import AjaxExample from './components/AjaxExample'




render(
  <Provider store={store}>
    <div>
      <App />

      <hr/>
      <AjaxExample></AjaxExample>
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