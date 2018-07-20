/**
 * Created by chengfan on 2017/5/24.
 */
export default {
  namespace: 'inputs',
  state: {
    input: 'name',
  },
  effects: {
    *change({payload:name}, { call, put, select }) {
      yield put({type:'change2',payload:name});
      //调用其他模块的reducers
      yield put({type:'lists/add',payload:name});
    },
  },

  reducers: {
    change2(state, { payload: name }) {
      console.log(state);
      return { input: name };
    },
  },
};
