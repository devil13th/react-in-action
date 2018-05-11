import {tabOperator} from './actions.js'

//选项卡的一些操作
const tabReducer = (state,action) => {

    switch(action.type){
        case tabOperator.ADD_TAB : { //添加选项卡
            const newTabArray = state.tabs ? [...state.tabs,action.tabObj] : [tabObj];
            const newState = Object.assign(state, {tabs:newTabArray}); 
            return newState;
        };

        case tabOperator.ACTIVE_TAB : { //激活选项卡
            const newState = Object.assign(state, {tabIndex:action.tabIndex}); 
            return newState;
        };
        
        default : {
            return state;
        }

    }

}

export default tabReducer;




