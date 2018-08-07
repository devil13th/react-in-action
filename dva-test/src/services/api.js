import api from '../utils/api';




var FetchUrl = {
  QUERY_ALL : "http://127.0.0.1:8000/ajaxserver/SysUser/queryAll"
}



export async function fetchQuerySysUser(params) {
  return api.post(FetchUrl.QUERY_ALL, params);
}
