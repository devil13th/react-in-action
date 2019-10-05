import rpc from '../../../utils/rpc';
import REQUEST_URL from '../../../constant/sysVar';
//查询字典分类


//查询公共字典分类
export async function fetchQuerySysDicPubClassify(queryExtraBean, queryConditionBean) {
  return rpc.fetch(REQUEST_URL.SYS_DIC_PUB_CLASSIFY.QUERY, { ...queryExtraBean, ...queryConditionBean });
}

//保存公共字典分类
export async function fetchSaveSysDicPubClassify(params) {
  return rpc.post(REQUEST_URL.SYS_DIC_PUB_CLASSIFY.SAVE, params);
}

//删除公共字典分类
export async function fetchDeleteSysDicPubClassify(params) {
  return rpc.delete(REQUEST_URL.SYS_DIC_PUB_CLASSIFY.DELETE + params);
}

//批量删除公共字典分类
export async function fetchDeleteSysDicPubClassifyBatch(params) {
  return rpc.fetch(REQUEST_URL.SYS_DIC_PUB_CLASSIFY.DELETEBATCH + params);
}

//查询单个公共字典分类
export async function fetchGetSysDicPubClassify(params) {
  return rpc.fetch(REQUEST_URL.SYS_DIC_PUB_CLASSIFY.GET + "/" + params);
}

//更新公共字典分类
export async function fetchUpdateSysDicPubClassify(params) {
  return rpc.put(REQUEST_URL.SYS_DIC_PUB_CLASSIFY.UPDATE, params);
}



