
export default {
  namespace: 'testData',
  // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
  state: {
    name:"devil13th",
    btonSize : "large",
    btonType : "primary",
    tabActivitiKey:"a",
  }, 
  effects: {
    
  },
  reducers: {
    mergeStage(state, { payload}) {
      return {...state,...payload}
    },
  }
};
