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
    },

    ["SET_FORM_DATA"]:(state,action) => {
        const state_temp = _.cloneDeep(state);
        if(action.data){
            state_temp.formData = action.data;
        }else{
            state_temp.formData = {total:0,rows:[]};
        }
        return state_temp;
    },
    ["SET_SELECTED_FORM_ID"]:(state,action) => {
        const state_temp = _.cloneDeep(state);
        
        state_temp.selectedFormId = action.selectedFormId;
      
        return state_temp;
    },
    ["CLEAR_SELECTED_FORM_ID"]:(state,action) => {
        const state_temp = _.cloneDeep(state);
        
        state_temp.selectedFormId = null;
      
        return state_temp;
    },
    ["SET_FORM_DATA_TYPE"]:(state,action) => {
        
        const state_temp = _.cloneDeep(state);
        state_temp.formDataType = action.formDataType;
        return state_temp;
    },


    
}

//模块整体的state 
const initialState = {
    formTableLoading:false,//form列表 loading状态
    formData:{
        total:0,
        rows:[],
        currentPage:1,
        pageSize:10
    },//form列表数据
    formDataType:"1",//form列表数据查询条件-类型
    selectedFormId:null,//选择的form

}

const formManagerReducer = makeReducer(ACTION_HANDLERS, initialState);
export  {formManagerReducer as formManagerReducer};