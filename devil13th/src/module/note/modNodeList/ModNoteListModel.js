import _ from 'lodash';
import { message } from 'antd';
import request from '../../../utils/request';
import CFG from '../../../constants';
import {
    fetchQueryModNoteList,
    fetchSaveModNoteList,
    fetchDeleteModNoteList,
    fetchGetModNoteList,
    fetchUpdateModNoteList,
    fetchDeleteModNoteListBatch,
    fetchQueryModNoteContentById,
    fetchsaveModNoteContent
} from './ModNoteListService'



export default {

    namespace: 'modNoteListModel',
    // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
    state: {

        //弹出窗口操作类型 save:保存 update:更新
        operateType: CFG.OPERATETYPE.SAVE,
        //选择的行ID - 用于表格的勾选
        selectedEntityIds: [],
        //新增或编辑窗口是否显示
        modNoteListFormVisible: false,
        //实体对象,用于编辑和新增
        entity: {
        },
        //表格列表数据
        listDataSource: [],
        //分页及排序信息 用于查询
        queryExtraBean: {
            current: 1,
            pageSize: CFG.PAGESIZE,
            total: 0,
            sortColumn: "NOTE_ID",
            sortOrder: "descend",
        },
        //查询条件信息 用于查询
        queryConditionBean: {
        },
        //布局
        layout:"list",
        //单击的行id
        clickRowId:"",
        //单击的行内容
        clickRowContent : ""

    },
    effects: {


        

        *saveModNoteContent({ payload }, { call, put, select }) {

            const {noteId,noteContent} = payload;
            yield put({type:"setNoteDescLoading",payload:{id:noteId}});


            const result = yield call(fetchsaveModNoteContent,payload);
            //console.log(result);


            const noteList = yield select((state) => {
                return state.modNoteListModel.listDataSource;
            })

            const newNoteList = noteList.map((item) => {
                if(item.NOTE_ID == noteId){
                    item.loading = null;
                    return {
                        ...item,description:noteContent
                    };
                }else{
                    return item;
                }
            });

            yield put({
                type: "mergeState",
                payload: {
                    listDataSource:newNoteList                   
                }
            })
            message.success(" OK !");
        },
        /**
         * 根据记事ID查询记事内容
         * @param {*} param0  payload:字符串, 记事ID 形如{payload:"1"}
         * @param {*} param1 
         */
        *loadNoteContent({ payload }, { call, put, select }) {

            yield put({type:"setNoteDescLoading",payload});

            const {id} = payload;
            const data = yield call(fetchQueryModNoteContentById,id);
         
            //debugger;
            //console.log(data.result.noteContent);
            //alert(data.result.noteContent);
            /*if(!data.result){
                message.info("未查询出数据");
                return;
            }*/
            const noteList = yield select((state) => {
                return state.modNoteListModel.listDataSource;
            })

            const newNoteList = noteList.map((item) => {
                if(item.NOTE_ID == id){
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
            });
            
            yield put({
                type: "mergeState",
                payload: {
                    listDataSource:newNoteList,
                    clickRowId:id,
                    clickRowContent:data.result.noteContent
                }
            })
        },
        /**
         * 编辑公共字典
         * @param {payload} param0 
         *  payload:实体主键
         * @param {*} param1 
         */
        *editModNoteList({ payload }, { call, put, select }) {
            const data = yield call(fetchGetModNoteList, payload);
            if (data.errMessage) {
                message.error("Error : " + data.errMessage);
            } else {

                yield put({
                    type: "mergeState",
                    payload: {
                        entity: data.result,
                        modNoteListFormVisible: true,
                        operateType: "update"
                    }
                });
            }
        },
        /**
         * 删除公共字典(单个)
         * @param {payload} param0 
         *  payload: 实体主键
         * @param {*} param1 
         */
        *deleteModNoteList({ payload }, { call, put, select }) {
            const data = yield call(fetchDeleteModNoteList, payload);
            if (data.errMessage) {
                message.error("Error : " + data.errMessage);
            } else {
                message.success(" OK !");
                yield put({ type: "queryList" });
            }
        },

        /**
         * 删除公共字典(多个)
         * @param {payload} param0 
         *  payload: 实体主键数组
         * @param {*} param1 
         */
        *deleteModNoteListBatch({ payload }, { call, put, select }) {
            const ids = payload.join(",");
            const data = yield call(fetchDeleteModNoteListBatch, ids);
            if (data.errMessage) {
                message.error("Error : " + data.errMessage);
            } else {
                message.success(" OK !");
                yield put({ type: "queryList" });
            }
        },



        /**
         * 保存公共字典
         * @param {payload} param0  
         *  payload:保存的对象
         * @param {*} param1 
         */
        *saveModNoteList({ payload }, { call, put, select }) {
            let operateType = yield select((state) => {
                return state.modNoteListModel.operateType
            });

            let operateFn = null;
            if (operateType === CFG.OPERATETYPE.UPDATE) {
                operateFn = fetchUpdateModNoteList;
            } else if (operateType === CFG.OPERATETYPE.SAVE) {
                operateFn = fetchSaveModNoteList;
            } else {
                message.error("Error : operate type not be found");
                return;
            }
            const data = yield call(operateFn, payload);

            if (data.errMessage) {
                message.error("Error : " + data.errMessage);
            } else {
                message.success(" OK !");
                yield put({
                    type: "mergeState",
                    payload: { modNoteListFormVisible: false }
                });
                yield put({ type: "queryList" });
            }
        },
        /**
         * 查询列表,并将实参中的分页信息(如果有)和查询条件信息(如果有)设置到state中
         * payload通常不用设置
         * 
         * payload : 非必须
         * {
         *  queryExtraBean : 非必须 分页排序信息
         *  queryConditionBean : 非必须 查询条件信息
         * }
        */
        *queryList({ payload }, { call, put, select }) {
            let queryExtraBean = null;
            let queryConditionBean = null;
            let newState = {};

            if (payload && payload.queryExtraBean) {//如果payload中有queryExtraBean则设置到state中
                newState.queryExtraBean = payload.queryExtraBean;
            } else {//如果payload中没有queryExtraBean则从state中获取
                queryExtraBean = yield select((state) => {
                    return state.modNoteListModel.queryExtraBean;
                });
                newState.queryExtraBean = queryExtraBean;
            }


            if (payload && payload.queryConditionBean) { //如果payload中有queryConditionBean则设置到state中
                newState.queryConditionBean = payload.queryConditionBean;
            } else {//如果payload中没有queryConditionBean则从state中获取
                queryConditionBean = yield select((state) => {
                    return state.modNoteListModel.queryConditionBean;
                });
                newState.queryConditionBean = queryConditionBean;
            }

            //将值为空的查询条件去掉 否则到后台收到的字符串是undefined
            const realConditionBean = {};
            for (let p in queryConditionBean) {
                if (queryConditionBean[p] != null && queryConditionBean[p] != undefined) {
                    realConditionBean[p] = queryConditionBean[p];
                }
            }

            //fetch查询数据
            const data = yield call(fetchQueryModNoteList, queryExtraBean, realConditionBean);

            //设置总条目数
            newState.queryExtraBean.total = data.result.total;

            //将数据及条目数设置到state中
            //将分页排序信息(如果有)和查询条件信息(如果有)设置到state中
            //清空勾选内容
            yield put({
                type: "mergeState",
                payload: {
                    selectedEntityIds: [],
                    listDataSource: data.result.result,
                    ...newState
                }
            })
        },

        //
        //payload : 查询条件
        /**
         * 根据查询条件进行查询, 并跳转至第一页
         * @param {payload} payload : 查询条件 json对象 
         * @param {*} param1 
         */
        *setQueryCondition({ payload }, { call, put, select }) {
            //初始化分页信息,有查询条件时一般是点击的查询按钮,点击查询按钮是跳转到第一页的但不会清空排序信息
            const queryExtraBean = yield select((state) => {
                return state.modNoteListModel.queryExtraBean
            });

            //设置当前页为第一页
            const newQueryExtraBean = {
                ...queryExtraBean,
                current: 1
            }

            //设置查询条件和分页信息到state
            yield put({
                type: "mergeState",
                payload: { queryConditionBean: payload, queryExtraBean: newQueryExtraBean }
            })

            yield put({ type: "queryList" })
        },

        /**
         * 根据state中的查询条件及分页排序信息
         * @param {*} payload 分页及排序信息
         * @param {*} param1 
         */
        *setPageAndSort({ payload }, { call, put, select }) {

            //从state中获取分页排序信息
            const queryExtraBean = yield select((state) => {
                return state.modNoteListModel.queryExtraBean
            });

            //设置排序及分页信息state
            yield put({
                type: "mergeState",
                payload: { queryExtraBean: { ...queryExtraBean, ...payload } }
            })

            yield put({ type: "queryList" });
        },

    },
    reducers: { 
        setNoteDescLoading(state, { payload }) {
            let {id} = payload;
            let listDataSource = state.listDataSource.map(function(record){
                if(record.NOTE_ID == id){
                    record.loading = "true";
                }
                return record;
            })
            //console.log(listDataSource);
            return { ...state, listDataSource }
        },
        mergeState(state, { payload }) {
            //console.log(payload);
            return { ...state, ...payload }
        }
    }
};
