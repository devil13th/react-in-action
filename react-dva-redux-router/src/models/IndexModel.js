export default {

  namespace: 'index',
  // 初始化state 也可以在index.js中进行初始化(如果属性名相同会覆盖模块state的初始化内容),
  state: {

    
  },
  effects: {

      *editSysDicPub({ payload }, { call, put, select }) {
          const data = yield call(fetchGetSysDicPub, payload);
          if (data.errMessage) {
              message.error("Error : " + data.errMessage);
          } else {

              yield put({
                  type: "mergeState",
                  payload: {
                      entity: data.result,
                      sysDicPubFormVisible: true,
                      operateType: "update"
                  }
              });
          }
      },
      /**
       * 删除公共字典(单个)
       * @param {payload} param0 
       *  payload: 实体主键
       * @param {*} param1 
       */
      *deleteSysDicPub({ payload }, { call, put, select }) {
          const data = yield call(fetchDeleteSysDicPub, payload);
          if (data.errMessage) {
              message.error("Error : " + data.errMessage);
          } else {
              message.success(" OK !");
              yield put({ type: "queryList" });
          }
      },

      /**
       * 删除公共字典(多个)
       * @param {payload} param0 
       *  payload: 实体主键数组
       * @param {*} param1 
       */
      *deleteSysDicPubBatch({ payload }, { call, put, select }) {
          const ids = payload.join(",");
          const data = yield call(fetchDeleteSysDicPubBatch, ids);
          if (data.errMessage) {
              message.error("Error : " + data.errMessage);
          } else {
              message.success(" OK !");
              yield put({ type: "queryList" });
          }
      },



      /**
       * 保存公共字典
       * @param {payload} param0  
       *  payload:保存的对象
       * @param {*} param1 
       */
      *saveSysDicPub({ payload }, { call, put, select }) {
          let operateType = yield select((state) => {
              return state.sysDicPubModel.operateType
          });

          let operateFn = null;
          if (operateType === CFG.OPERATETYPE.UPDATE) {
              operateFn = fetchUpdateSysDicPub;
          } else if (operateType === CFG.OPERATETYPE.SAVE) {
              operateFn = fetchSaveSysDicPub;
          } else {
              message.error("Error : operate type not be found");
              return;
          }
          const data = yield call(operateFn, payload);

          if (data.errMessage) {
              message.error("Error : " + data.errMessage);
          } else {
              message.success(" OK !");
              yield put({
                  type: "mergeState",
                  payload: { sysDicPubFormVisible: false }
              });
              yield put({ type: "queryList" });
          }
      },
      /**
       * 查询列表,并将实参中的分页信息(如果有)和查询条件信息(如果有)设置到state中
       * payload通常不用设置
       * 
       * payload : 非必须
       * {
       *  queryExtraBean : 非必须 分页排序信息
       *  queryConditionBean : 非必须 查询条件信息
       * }
      */
      *queryList({ payload }, { call, put, select }) {
          let queryExtraBean = null;
          let queryConditionBean = null;
          let newState = {};

          if (payload && payload.queryExtraBean) {//如果payload中有queryExtraBean则设置到state中
              newState.queryExtraBean = payload.queryExtraBean;
          } else {//如果payload中没有queryExtraBean则从state中获取
              queryExtraBean = yield select((state) => {
                  return state.sysDicPubModel.queryExtraBean;
              });
              newState.queryExtraBean = queryExtraBean;
          }


          if (payload && payload.queryConditionBean) { //如果payload中有queryConditionBean则设置到state中
              newState.queryConditionBean = payload.queryConditionBean;
          } else {//如果payload中没有queryConditionBean则从state中获取
              queryConditionBean = yield select((state) => {
                  return state.sysDicPubModel.queryConditionBean;
              });
              newState.queryConditionBean = queryConditionBean;
          }

          //将值为空的查询条件去掉 否则到后台收到的字符串是undefined
          const realConditionBean = {};
          for (let p in queryConditionBean) {
              if (queryConditionBean[p] != null && queryConditionBean[p] != undefined) {
                  realConditionBean[p] = queryConditionBean[p];
              }
          }

          //fetch查询数据
          const data = yield call(fetchQuerySysDicPub, queryExtraBean, realConditionBean);

          //设置总条目数
          newState.queryExtraBean.total = data.result.total;

          //将数据及条目数设置到state中
          //将分页排序信息(如果有)和查询条件信息(如果有)设置到state中
          //清空勾选内容
          yield put({
              type: "mergeState",
              payload: {
                  selectedEntityIds: [],
                  listDataSource: data.result.result,
                  ...newState
              }
          })
      },

      //
      //payload : 查询条件
      /**
       * 根据查询条件进行查询, 并跳转至第一页
       * @param {payload} payload : 查询条件 json对象 
       * @param {*} param1 
       */
      *setQueryCondition({ payload }, { call, put, select }) {
          //初始化分页信息,有查询条件时一般是点击的查询按钮,点击查询按钮是跳转到第一页的但不会清空排序信息
          const queryExtraBean = yield select((state) => {
              return state.sysDicPubModel.queryExtraBean
          });

          //设置当前页为第一页
          const newQueryExtraBean = {
              ...queryExtraBean,
              current: 1
          }

          //设置查询条件和分页信息到state
          yield put({
              type: "mergeState",
              payload: { queryConditionBean: payload, queryExtraBean: newQueryExtraBean }
          })

          yield put({ type: "queryList" })
      },

      /**
       * 根据state中的查询条件及分页排序信息
       * @param {*} payload 分页及排序信息
       * @param {*} param1 
       */
      *setPageAndSort({ payload }, { call, put, select }) {

          //从state中获取分页排序信息
          const queryExtraBean = yield select((state) => {
              return state.sysDicPubModel.queryExtraBean
          });

          //设置排序及分页信息state
          yield put({
              type: "mergeState",
              payload: { queryExtraBean: { ...queryExtraBean, ...payload } }
          })

          yield put({ type: "queryList" });
      },

  },
  reducers: {
      mergeState(state, { payload }) {
          //console.log(payload);
          return { ...state, ...payload }
      }
  }
};
