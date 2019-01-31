import rpc from '../utils/rpc';


import REQUEST_URL from '../constant/sysVar';


//查询用户
export async function fetchQuerySysUser(params) {
  return rpc.post(REQUEST_URL.QUERY_ALL, params);
}

//保存用户
export async function fetchSaveSysUser(params) {
  return rpc.post(REQUEST_URL.SAVE_USER, params);
}

//删除用户
export async function fetchDeleteSysUser(params) {
  return rpc.delete(REQUEST_URL.DELETE_USER+"/"+params);
}

//查询单个用户
export async function fetchGetSysUser(params) {
  return rpc.fetch(REQUEST_URL.GET_USER+"/"+params);
}

//更新用户
export async function fetchUpdateSysUser(params) {
  return rpc.post(REQUEST_URL.UPDATE_USER,params);
}

//查询组织机构
export async function fetchQuerySysOrgData(param){
  return rpc.fetch(REQUEST_URL.QUERY_ORG,{orgName:param})
}






