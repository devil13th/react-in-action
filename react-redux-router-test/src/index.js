import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import store from './store';
import {Provider} from 'react-redux';
import DevTools from './container/DevTools'

ReactDOM.render(
    <Provider store={store}>
        <div style={{height:"100%"}}>
            <App></App>
            {/* <DevTools />*/}
        </div>
    </Provider>
    ,document.getElementById("app")
)