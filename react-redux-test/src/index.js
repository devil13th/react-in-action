import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Tab from './Tab.js';
import TabContent from './TabContent.js';
import {createStore} from 'redux';
import reducer from './reducers';


const store = createStore(reducer,{});

ReactDOM.render(
    <Provider store={store}>
        <Tab>
            
        </Tab>
    </Provider>
    ,
    document.getElementById("app")
)

