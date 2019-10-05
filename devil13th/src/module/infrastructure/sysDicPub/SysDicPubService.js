import rpc from '../../../utils/rpc';
import REQUEST_URL from '../../../constant/sysVar';
//查询字典分类


//查询系统字典
export async function fetchQuerySysDicPub(queryExtraBean, queryConditionBean) {
  return rpc.fetch(REQUEST_URL.SYSDICPUB.QUERY, { ...queryExtraBean, ...queryConditionBean });
}

//保存系统字典
export async function fetchSaveSysDicPub(params) {
  return rpc.post(REQUEST_URL.SYSDICPUB.SAVE, params);
}

//删除系统字典
export async function fetchDeleteSysDicPub(params) {
  return rpc.delete(REQUEST_URL.SYSDICPUB.DELETE + params);
}

//批量删除系统字典
export async function fetchDeleteSysDicPubBatch(params) {
  return rpc.fetch(REQUEST_URL.SYSDICPUB.DELETEBATCH + params);
}

//查询单个系统字典
export async function fetchGetSysDicPub(params) {
  return rpc.fetch(REQUEST_URL.SYSDICPUB.GET + "/" + params);
}

//更新系统字典
export async function fetchUpdateSysDicPub(params) {
  return rpc.put(REQUEST_URL.SYSDICPUB.UPDATE, params);
}



