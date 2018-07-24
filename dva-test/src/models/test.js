import _ from 'lodash';
import {message} from 'antd';
export default {
  namespace: 'testData',
  // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
  state: {
    name:"devil13th",
    btonSize : "large",
    btonType : "primary",
    tabActivitiKey:"a",
    timeLineData : [{key:'z',icon:'',text:'xx',time:'2017-08-08'}],
    timeModalVisible:false
  }, 
  effects: {
    
  },
  reducers: {
    mergeStage(state, { payload}) {
      return {...state,...payload}
    },
    addTime(state, { payload}) {
      const _state = _.cloneDeep(state);
      _state.timeLineData.push(payload);
      _state.timeModalVisible = false;
      message.info("操作成功");
      return _state;
    },
    deleteTime(state, { payload}) {
      
    
      const newTimeData = state.timeLineData.filter((obj) => {
        return obj.key != payload
      })
      message.info("操作成功");
      return {...state,timeLineData:newTimeData};
    },

  }
};
