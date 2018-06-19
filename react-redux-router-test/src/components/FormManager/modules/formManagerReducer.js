import {makeReducer} from '../../../helper/index';
import _ from 'lodash';


const ACTION_HANDLERS = {
    // [ADD_CONTROLS]:(state,action) =>{
    //     return state;
    // }

    ["LOADING_FORMLIST"]:(state,action) =>{
        const state_temp = _.cloneDeep(state);
        state_temp.formTableLoading = action.loading;
        return state_temp;
    }
}

//模块整体的state 
const initialState = {
    formTableLoading:false
}

const formManagerReducer = makeReducer(ACTION_HANDLERS, initialState);
export  {formManagerReducer as formManagerReducer};