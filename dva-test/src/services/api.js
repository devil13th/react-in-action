import api from '../utils/api';


import REQUEST_URL from '../constant/sysVar';


//查询用户
export async function fetchQuerySysUser(params) {
  return api.post(REQUEST_URL.QUERY_ALL, params);
}

//保存用户
export async function fetchSaveSysUser(params) {
  return api.post(REQUEST_URL.SAVE_USER, params);
}

//删除用户
export async function fetchDeleteSysUser(params) {
  return api.delete(REQUEST_URL.DELETE_USER+"/"+params);
}

//查询单个用户
export async function fetchGetSysUser(params) {
  return api.fetch(REQUEST_URL.GET_USER+"/"+params);
}

//更新用户
export async function fetchUpdateSysUser(params) {
  return api.post(REQUEST_URL.UPDATE_USER,params);
}

//查询组织机构
export async function fetchQuerySysOrgData(param){
  return api.fetch(REQUEST_URL.QUERY_ORG,{orgName:param})
}






