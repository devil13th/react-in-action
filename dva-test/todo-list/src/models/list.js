export default {
  namespace: 'lists',
  state: [],
  effects: {
    *add({ payload }, { call, put, select }) {
      alert(payload);
      
      const st = yield select(state => state);
      console.log(st);

      const c = yield put({type:"add2",payload:{name:payload}});
      console.log(c)
    },

    *fetch({ payload }, { call, put, select }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  reducers: {
    add2(state, { payload: name }) {
      console.log(state)
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
