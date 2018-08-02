import _ from 'lodash';
import {message} from 'antd';
export default {
  namespace: 'sysUser',
  // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
  state: {
    dataSource : []
  }, 
  effects: {
    *getUserData({ payload }, { call, put, select }) {

      let obj = {
        "sortColumn":"user_name",
        "sortOrder":"desc",
        "pageSize":10,
        "current":1
      }

      function *aa(obj){
        alert(1)
        yield put({type:"mergeStage",payload:{
          dataSource:obj
        }})
      }
      
      fetch(
        "http://127.0.0.1:8000/ajaxserver/SysUser/queryAll",
        {
          method:'POST',
          headers:{
            'Access-Control-Allow-Origin': '*',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'aa':'1234'
          },
          body:JSON.stringify(obj)
        }
      ).then(function(res){
        return res.text();
      }).then(function(res){
        let result = JSON.parse(res);
        if(result.status=="SUCCESS"){
          console.log(result.result.result)
          yield aa(result.result.result)
        }else{
          message.info("请求失败");
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
    mergeStage(state, { payload}) {
      alert(2)
      console.log(payload);
      return {...state,...payload}
    }
  }
};
