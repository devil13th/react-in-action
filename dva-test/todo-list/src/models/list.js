
export default {
  namespace: 'lists',
  // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
  state: [
    { name: 'dva', id: 1 },
    { name: 'antd', id: 2 },
  ], 
  effects: {
    *add({ payload }, { call, put, select }) {
      
      //从全局状态中选择数据
      const st = yield select(state => {return state}); //state 是全部的state并不是 state.lists 
      console.log( "============ a1 =============");
      console.log(st);
      const c = yield put({ type: 'add2', payload : payload });
      console.log( "============ a2 =============");
      console.log(c); //本次发送的action
      console.log( "============ a3 =============");
      const st2 = yield select(state => state);
      console.log(st2);

    },

    *fetch({ payload }, { call, put, select }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  reducers: {
    add2(state, { payload: name }) {
      console.log("============ b1 =============");
      console.log(state); //本模块的state   state.lists
      let id = state.reduce(
        (previous, current) => (previous.id > current.id ? previous : current),
      ).id;
      id += 1;
      return [...state, { name, id }];
    },
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
