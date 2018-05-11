import { createStore,compose } from 'redux'
import tabReducer from '../redux/reducers.js'

import DevTools from '../containers/DevTools.js'



const enhancer = compose(
    DevTools.instrument()
);

const store = createStore(tabReducer,{tabIndex:0,tabs:[{title:'1',content:'1'},{title:'2',content:'2'}]},enhancer);
//let store = createStore(todoApp,enhancer);

export {store}