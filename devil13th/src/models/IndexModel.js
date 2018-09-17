import _ from 'lodash';
import { message } from 'antd';
//import request from '../utils/request';
import CFG from '../constants';

export default {

    namespace: 'Index',
    // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
    state: {
        appName:CFG.APP_NAME,
        author:CFG.AUTHOR,
        version:CFG.VESION,
        path:"1234"
    },
    effects: {
        
    },
    reducers: {
        mergeState(state, { payload }) {
            //console.log(payload);
            return { ...state, ...payload }
        }
    }
};
