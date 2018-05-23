import reducers from '../reducers';
import { createStore,compose  } from 'redux';

import DevTools from '../container/DevTools'


const enhancer = compose(
    DevTools.instrument()
  );
  
const store = createStore(reducers, enhancer);





export default store; 
