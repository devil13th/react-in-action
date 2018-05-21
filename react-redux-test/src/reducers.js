import {
    TAB_ACTIVE_ACTION,
    TAB_ADD_ACTION,
    TAB_REMOVE_ACTION,
    createTabActiveAction,
    createTabAddAction,
    createTabRemoveAction
} from './action.js'
import { combineReducers } from 'redux'


function activeIndex(state=-1,action) {
    
    switch(action.type){
        case TAB_ACTIVE_ACTION : {
            return action.activeIndex
        };
        default : {
            return state
        };
    }
}


const tabListsInit = [
    {idx:0,title:"default1",content:"default1",valid:true,open:true},
    {idx:1,title:"default2",content:"default2",valid:true,open:false},
    {idx:2,title:"default3",content:"default3",valid:true,open:false}
]

function tabList(state=tabListsInit,action){
   
    switch(action.type){
        case TAB_ACTIVE_ACTION:{
            const newTabs = state.map((item) => {
                if(item.idx == action.activeIndex){
                    return {
                        idx:item.idx,
                        title:item.title,
                        content:item.content,
                        valid:item.valid,
                        open:true
                    }
                }else{
                    return {
                        idx:item.idx,
                        title:item.title,
                        content:item.content,
                        valid:item.valid,
                        open:item.open
                    }
                }
            })
            return newTabs;
        };
        case TAB_ADD_ACTION:{
            return [...state,{idx:state.length,title:action.title,content:action.content,valid:true,open:false}];
        };
        case TAB_REMOVE_ACTION:{
            const newTabs = state.map((item) => {
                if(item.idx == action.id){
                    return {
                        idx:item.idx,
                        title:item.title,
                        content:item.content,
                        valid:false
                    }
                }else{
                    return {
                        idx:item.idx,
                        title:item.title,
                        content:item.content,
                        valid:item.valid
                    }
                }
            })
            return newTabs;
        };
        default : {
            return state;
        };
    }
}


const reducers = combineReducers(
    {
        activeIndex,
        tabList
    }
)
  
export default reducers;



