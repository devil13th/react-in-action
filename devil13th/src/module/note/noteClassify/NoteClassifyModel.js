import _ from 'lodash';
import { message } from 'antd';
import request from '../../../utils/request';
import {queryRoot,queryChild} from './NoteClassifyService';
import jsonTreeUtil from '../../../utils/jsonTreeUtil';
/*
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
*/

export default {

    namespace: 'noteClassifyModel',
    
    state: {
        //分类树数据
        treeData : [] 
    },
    effects: {
        //查询根节点
        *queryRoot({ payload }, { call, put, select }) {
            const data = yield call(queryRoot, payload);
            //console.log(data);

            const treeData = data.result.map(function(item){
              return{
                key : item.CLASSIFY_ID,
                title:item.CLASSIFY_NAME
              }
            })

            console.log(treeData);

            yield put({
                type: "mergeState",
                payload: {
                  treeData
                }
            })
        }, 
        //查询子节点
        *queryChild({ payload }, { call, put, select }) {
          const data = yield call(queryChild, payload);
          //console.log(data);

          const childDatas = data.result.map(function(item){
    
            return{
              key : item.CLASSIFY_ID,
              title:item.CLASSIFY_NAME,
              isLeaf:item.IS_LEAF == '1' ? true : false
            }
          })

          console.log(childDatas);
          const oldTreeData =  yield select((state) => {
            return state.noteClassifyModel.treeData;
          });

          jsonTreeUtil.addObj("key",payload.code,oldTreeData,"children",childDatas);


          yield put({
              type: "mergeState",
              payload: {
                treeData : [...oldTreeData]
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
