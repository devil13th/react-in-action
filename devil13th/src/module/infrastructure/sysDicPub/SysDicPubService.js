import rpc from '../../../utils/rpc';
import REQUEST_URL from '../../../constant/sysVar';


//查询系统字典
export async function fetchQuerySysDicPub(params) {
  return rpc.fetch(REQUEST_URL.SYSDICPUB.QUERY, params);
}

//保存系统字典
export async function fetchSaveSysUser(params) {
  return rpc.post(REQUEST_URL.SYSDICPUB.SAVE, params);
}

//删除系统字典
export async function fetchDeleteSysUser(params) {
  return rpc.delete(REQUEST_URL.SYSDICPUB.DELETE+"/"+params);
}

//查询单个系统字典
export async function fetchGetSysUser(params) {
  return rpc.fetch(REQUEST_URL.SYSDICPUB.GET+"/"+params);
}

//更新系统字典
export async function fetchUpdateSysUser(params) {
  return rpc.put(REQUEST_URL.SYSDICPUB.UPDATE,params);
}



