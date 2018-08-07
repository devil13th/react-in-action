import _ from 'lodash';
import {message} from 'antd';
import request from '../utils/request';

import {fetchQuerySysUser} from '../services/api'
export default {
  namespace: 'sysUser',
  // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
  state: {
    dataSource : []
  }, 
  effects: {
    *getUserData({ payload }, { call, put, select }) {

      const result = yield call(fetchQuerySysUser,payload)
      
      //console.log(result)

      yield put({
        type:"mergeState",
        payload:{
          dataSource:result.result.result,
          current:result.result.current,
          pageSize:result.result.pageSize,
          total:result.result.total
        }
      })


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
    mergeState(state, { payload}) {
      //console.log(payload);
      return {...state,...payload}
    }
  }
};
