import rpc from '../../../utils/rpc';
import REQUEST_URL from '../../../constant/sysVar';
//查询字典分类


//查询公共字典分类
export async function fetchQueryReactCodegenTest(queryExtraBean, queryConditionBean) {
  return rpc.fetch(REQUEST_URL.REACT_CODEGEN_TEST.QUERY, { ...queryExtraBean, ...queryConditionBean });
}

//保存公共字典分类
export async function fetchSaveReactCodegenTest(params) {
  return rpc.post(REQUEST_URL.REACT_CODEGEN_TEST.SAVE, params);
}

//删除公共字典分类
export async function fetchDeleteReactCodegenTest(params) {
  return rpc.delete(REQUEST_URL.REACT_CODEGEN_TEST.DELETE + params);
}

//批量删除公共字典分类
export async function fetchDeleteReactCodegenTestBatch(params) {
  return rpc.fetch(REQUEST_URL.REACT_CODEGEN_TEST.DELETEBATCH + params);
}

//查询单个公共字典分类
export async function fetchGetReactCodegenTest(params) {
  return rpc.fetch(REQUEST_URL.REACT_CODEGEN_TEST.GET + "/" + params);
}

//更新公共字典分类
export async function fetchUpdateReactCodegenTest(params) {
  return rpc.put(REQUEST_URL.REACT_CODEGEN_TEST.UPDATE, params);
}



