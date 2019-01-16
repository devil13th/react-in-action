import _ from 'lodash';
import { message } from 'antd';
import request from '../../../utils/request';
import {queryRoot} from './NoteClassifyService'

const treeData = [{
    title: '0-0',
    key: '0-0',
    children: [{
      title: '0-0-0',
      key: '0-0-0',
      children: [
        { title: '0-0-0-0', key: '0-0-0-0' },
        { title: '0-0-0-1', key: '0-0-0-1' },
        { title: '0-0-0-2', key: '0-0-0-2' },
      ],
    }, {
      title: '0-0-1',
      key: '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0' },
        { title: '0-0-1-1', key: '0-0-1-1' },
        { title: '0-0-1-2', key: '0-0-1-2' },
      ],
    }, {
      title: '0-0-2',
      key: '0-0-2',
    }],
  }, {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  }, {
    title: '0-2',
    key: '0-2',
  }];


export default {

    namespace: 'noteClassifyModel',
    
    state: {
        //分类树数据
        treeData : treeData 
    },
    effects: {
        //查询根节点
        *queryRoot({ payload }, { call, put, select }) {
            const data = yield call(queryRoot, payload);
            console.log(data);
            yield put({
                type: "mergeState",
                payload: {
                    sysOrgData: data.result
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
