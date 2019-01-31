import _ from 'lodash';
import { message } from 'antd';
import request from '../../../utils/request';
import {rpcQueryModNoteList,rpcQueryModNoteContentById} from './NoteListService'

import CFG from '../../../constants';

export default {

    namespace: 'noteListModel',
    
    state: {
        //记事数据
        noteList : [] ,
        //单个记事数据
        noteContent:{noteTitle:"1"},
        //创建记事面板显示/隐藏
        createNotePanelVisible:false,
        //查询条件 分页 排序信息
        queryBean : {
            current : 1,
            pageSize : CFG.PAGESIZE,
            sortColumn : "NOTE_TITLE",
            sortOrder : "descend",
            total : 0,
            queryParams : {
                //NOTE_TITLE:"雪"
            }
        }
    },
    effects: {
        /**
         * 根据记事ID查询记事内容
         * @param {*} param0  payload:字符串, 记事ID 形如{payload:"1"}
         * @param {*} param1 
         */
        *loadNoteContent({ payload }, { call, put, select }) {

            yield put({type:"setNoteDescLoading",payload});

            const data = yield call(rpcQueryModNoteContentById,payload);
            //debugger;
            //console.log(data.result.noteContent);
            //alert(data.result.noteContent);
            /*if(!data.result){
                message.info("未查询出数据");
                return;
            }*/
            const noteList = yield select((state) => {
                return state.noteListModel.noteList;
            })

            const newNoteList = noteList.map((item) => {
                if(item.NOTE_ID == payload){
                    item.loading = null;
                    if(data.result){
                        return {
                            ...item,description:data.result.noteContent
                        };
                    }else{
                        return {
                            ...item,description:"未查询出数据"
                        };
                    }
                }else{
                    return item;
                }
            })

            //console.log(newNoteList);

            yield put({
                type: "mergeState",
                payload: {
                    noteList:newNoteList
                }
            })

        },
        /**
         * 设置分页信息并进行查询 - 带着state中的查询条件进行查询
         * @param {*} param0 : {current:Integer ,pageSize: Integer}  curent:当前页码  pageSize:每页条目数
         * @param {*} param1 
         */
        *queryNoteListByPage({ payload }, { call, put, select }) {
            //重新设置分页信息
            const newQueryBean = yield select((state) => {
                return {
                    ... state.noteListModel.queryBean,
                    //current: payload.current,
                    //pageSize: payload.pageSize
                    ...payload
                }
            });

            //设置state
            yield put({
                type: "mergeState",
                payload:{
                    queryBean : newQueryBean
                }
            })

            const data = yield call(rpcQueryModNoteList, newQueryBean);

         

            const {current,pageSize,sortColumn,sortOrder,total,queryParams} = data.result;
            //console.log(data);
            yield put({
                type: "mergeState",
                payload: {
                    noteList: data.result.result,
                    queryBean : {current,pageSize,sortColumn,sortOrder,total,queryParams}
                }
            })
        },


       
        /**
         * 查询记事列表 payload 是查询条件对象(queryBean.queryParams) 不带分页信息
         * @param {*} param0  queryBean.queryParams(不带分页信息)
         * @param {*} param1 
         */
        *queryNoteList({ payload }, { call, put, select }) {
            //重新设置查询条件
            if(payload){
                yield put({
                    type: "setQueryNoteListCondition",
                    payload 
                })
            }
            const queryBean = yield select((state) => {
                return state.noteListModel.queryBean;
            });
            const data = yield call(rpcQueryModNoteList,queryBean);

            const {current,pageSize,sortColumn,sortOrder,total,queryParams} = data.result;
            //console.log(data);
            yield put({
                type: "mergeState",
                payload: {
                    noteList: data.result.result,
                    queryBean : {current,pageSize,sortColumn,sortOrder,total,queryParams}
                }
            })
        }, 

        /**
         * 清空查询条件并进行查询 
         * @param {*} param0 不用传,传了也没用
         * @param {*} param1 
         */
        *clearQueryParamsForNoteList({ payload }, { call, put, select }) {
            //清空查询条件
            /*yield put({
                type: "mergeState",
                payload : {
                    queryBean : {
                        current : 1,
                        pageSize : CFG.PAGESIZE,
                        sortColumn : "NOTE_TITLE",
                        sortOrder : "descend",
                        total : 0,
                        queryParams : {
                            //NOTE_TITLE:"雪"
                        }
                    }
                }
            })*/



            const newQueryBean = yield select((state) => {
                return {
                    ... state.noteListModel.queryBean
                }
            });


            const queryBean = {...newQueryBean,current:1,queryParams:{}}
            const data = yield call(rpcQueryModNoteList,queryBean);


            
            const {current,pageSize,sortColumn,sortOrder,total,queryParams} = data.result;
            //console.log(data);
            yield put({
                type: "mergeState",
                payload: {
                    noteList: data.result.result,
                    queryBean : {current,pageSize,sortColumn,sortOrder,total,queryParams}
                }
            })

           

        }
    },
    reducers: {
        mergeState(state, { payload }) {
            //console.log(payload);
            return { ...state, ...payload }
        },
        setQueryNoteListCondition(state, { payload }){
            //alert(state);
            //console.log(state);
            var stateTemp = {...state,queryBean:{...state.queryBean,queryParams:payload}}
            return stateTemp;
        },
        setPageInfo(state,{payload}){
            const{current,pageSize} = payload;
            var stateTemp = {...state,queryBean:{...state.queryBean,current,pageSize}}
            return stateTemp;
        },
        //展开行显示内容时 等待时候的loading
        setNoteDescLoading(state,{payload}){
            const id = payload;


            const noteList = state.noteList.map((item) => {
                if(item.NOTE_ID == payload){
                    
                    return {
                        ...item,loading:true
                    };
                   
                }else{
                    return item;
                }
            })

            


            return {...state,noteList};
        }
    }
};
