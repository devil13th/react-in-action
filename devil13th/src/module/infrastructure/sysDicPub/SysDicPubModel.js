import _ from 'lodash';
import { message } from 'antd';
import request from '../../../utils/request';

import {
    fetchQuerySysDicPub
} from './SysDicPubService'

import CFG from '../../../constants';

export default {

    namespace: 'sysDicPubModel',
    // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
    state: {
        listDataSource:[],
        queryBean : {
            current : 1,
            pageSize : CFG.PAGESIZE,
            total : 0,
            sortColumn : "DIC_NAME",
            sortOrder : "",
            queryParams : {
                //NOTE_TITLE:"雪"
            }
        }
    },
    effects: {
        //查询列表
        *queryList({ payload }, { call, put, select }) {
            
            const queryBean = yield select((state) => {
                return state.sysDicPubModel.queryBean;
            });
            const data = yield call(fetchQuerySysDicPub,queryBean);
     
            const {current,pageSize,sortColumn,sortOrder,total,queryParams} = data.result;
            //console.log(data);
            yield put({
                type: "mergeState",
                payload: {
                    listDataSource: data.result.result,
                    queryBean : {current,pageSize,sortColumn,sortOrder,total,queryParams}
                }
            })
        },

        //设置分页和排序
        *setPageAndSort({ payload }, { call, put, select }) {
            
            //重新设置分页信息
            const newQueryBean = yield select((state) => {
                return {
                    ... state.sysDicPubModel.queryBean,
                    //current: payload.current,
                    //pageSize: payload.pageSize
                    ...payload
                }
            });

            if(!newQueryBean.sortColumn){
                newQueryBean.sortColumn = "";
            }

            //设置state
            yield put({
                type: "mergeState",
                payload:{
                    queryBean : newQueryBean
                }
            })

            const data = yield call(fetchQuerySysDicPub, newQueryBean);

          

            const {current,pageSize,sortColumn,sortOrder,total,queryParams} = data.result;
            //console.log(data);
            yield put({
                type: "mergeState",
                payload: {
                    listDataSource: data.result.result,
                    queryBean : {
                        current,
                        pageSize,
                        sortColumn,
                        sortOrder,
                        total,
                        queryParams
                    }
                }
            })


        },
        
    },
    reducers: {
        mergeState(state, { payload }) {
            //console.log(payload);
            return { ...state, ...payload }
        }
    }
};
