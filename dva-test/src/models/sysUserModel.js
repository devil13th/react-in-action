import _ from 'lodash';
import { message } from 'antd';
import request from '../utils/request';

import {
    fetchQuerySysUser,
    fetchSaveSysUser,
    fetchDeleteSysUser,
    fetchGetSysUser,
    fetchUpdateSysUser,
    fetchQuerySysOrgData
} from '../services/api'
export default {

    namespace: 'sysUser',
    // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
    state: {
        dataSource: [], // 列表数据
        current: 1, //列表当前页
        pageSize: 10, //列表每页条目数
        SysUserFormModalVisible: false,//用户信息编辑模态窗口显示/隐藏状态
        sysUserInfo: {}, // 用户信息
        queryCondition: {},//查询条件
        sysOrgData: [],//组织机构列表
        uploadModalVisible: false,//头像上传模态窗口显示/隐藏状态

    },
    effects: {
        //查询组织机构
        *querySysOrgData({ payload }, { call, put, select }) {
            const data = yield call(fetchQuerySysOrgData, payload);
            console.log(data);
            yield put({
                type: "mergeState",
                payload: {
                    sysOrgData: data.result
                }
            })
        },
        //设置查询条件
        *setQueryCondition({ payload }, { call, put, select }) {
            /*
            console.log("-----",payload)
            const queryCondition = [];
            for(var pro in payload.queryCondition){
            if(payload.queryCondition[pro]){
            queryCondition.push({
            [pro]:payload.queryCondition[pro]
            })
            }
            }
            console.log(queryCondition)
            */

            yield put({
                type: "mergeState",
                payload: {
                    queryCondition: payload.queryCondition,
                    current: 1, //点击查询按钮需要重置当前页码
                }
            })

            yield put({
                type: "getUserData"
            })

        },

        //保存用户信息
        *saveUserInfo({ payload }, { call, put, select }) {
            console.log(payload)
            const result = yield call(fetchSaveSysUser, payload);
            console.log(result)
            if ("SUCCESS" == result.status) {
                message.info("保存成功!", 3);
                //关闭模态窗口
                yield put({
                    type: "mergeState",
                    payload: {
                        SysUserFormModalVisible: false
                    }
                })
            } else {
                message.error("保存失败:" + result.message);
            }

            //重新查询列表数据
            yield put({
                type: "getUserData"
            })
        },


        //更新用户信息
        *updateUserInfo({ payload }, { call, put, select }) {
            console.log(payload)
            const result = yield call(fetchUpdateSysUser, payload);
            console.log(result)
            if ("SUCCESS" == result.status) {
                message.info("更新成功!", 3);
                //关闭模态窗口
                yield put({
                    type: "mergeState",
                    payload: {
                        SysUserFormModalVisible: false,
                        sysUserInfo: {}
                    }
                })
            } else {
                message.error("更新失败:" + result.message);
            }

            //重新查询列表数据
            yield put({
                type: "getUserData"
            })
        },

        //设置分页信息
        *setPageInfo({ payload }, { call, put, select }) {
            yield put({
                type: "mergeState",
                payload
            })

            yield put({
                type: "getUserData"
            })
        },

        //删除用户
        *deleteUser({ payload }, { call, put, select }) {
            const result = yield call(fetchDeleteSysUser, payload);
            //console.log(result);
            if ("SUCCESS" == result.status) {
                message.info("操作成功");
                yield put({
                    type: "getUserData"
                })
            }
        },

        //查询单个用户信息
        *queryUser({ payload }, { call, put, select }) {
            const result = yield call(fetchGetSysUser, payload);
            //console.log(result);

            yield put({
                type: "mergeState",
                payload: {
                    sysUserInfo: result.result,
                    SysUserFormModalVisible: true
                }
            });

        },





        //获取用户列表信息
        *getUserData({ payload }, { call, put, select }) {

            //如果没有分页等信息 则从store中获取
            if (!payload) {
                payload = yield select((state) => {
                    return {
                        current: state.sysUser.current,
                        pageSize: state.sysUser.pageSize,
                        conditions: state.sysUser.queryCondition
                    }
                });
            }


            const result = yield call(fetchQuerySysUser, payload)

            //console.log(result)
            if ("SUCCESS" == result.status) {


                yield put({
                    type: "mergeState",
                    payload: {
                        dataSource: result.result.result,
                        current: result.result.current,
                        pageSize: result.result.pageSize,
                        total: result.result.total
                    }
                })
            } else {
                message.error("查询失败:" + result.message);
            }





            //从全局状态中选择数据
            /*
                const st = yield select(state => {return state}); //state 是全部的state并不是 state.lists 
            console.log( "============ a1 =============");
            console.log(st);
            const c = yield put({ type: 'add2', payload : payload });
            console.log( "============ a2 =============");
            console.log(c); //本次发送的action
            console.log( "============ a3 =============");
            const st2 = yield select(state => state);
            console.log(st2);*/

        },
    },
    reducers: {
        mergeState(state, { payload }) {
            //console.log(payload);
            return { ...state, ...payload }
        }
    }
};
