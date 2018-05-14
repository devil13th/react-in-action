import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import {App} from './components/App.js'
import DevTools from './containers/DevTools.js'
import {store} from './redux/createStore.js'



render(
  <Provider store={store}>
    <div>
      <App/>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
)
