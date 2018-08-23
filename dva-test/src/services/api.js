import api from '../utils/api';


var FetchUrl = {
  QUERY_ALL : "/SysUser/queryAll",
  SAVE_USER : "/SysUser/saveSysUser",
  DELETE_USER: "/SysUser/deleteSysUser",
  GET_USER:"/SysUser/queryById",
  UPDATE_USER:"/SysUser/updateSysUser",
  QUERY_ORG:"/SysUser/queryOrgForSelect",

  
}


//查询用户
export async function fetchQuerySysUser(params) {
  return api.post(FetchUrl.QUERY_ALL, params);
}

//保存用户
export async function fetchSaveSysUser(params) {
  return api.post(FetchUrl.SAVE_USER, params);
}

//删除用户
export async function fetchDeleteSysUser(params) {
  return api.delete(FetchUrl.DELETE_USER+"/"+params);
}

//查询单个用户
export async function fetchGetSysUser(params) {
  return api.fetch(FetchUrl.GET_USER+"/"+params);
}

//更新用户
export async function fetchUpdateSysUser(params) {
  return api.post(FetchUrl.UPDATE_USER,params);
}

//查询组织机构
export async function fetchQuerySysOrgData(param){
  return api.fetch(FetchUrl.QUERY_ORG,{orgName:param})
}






