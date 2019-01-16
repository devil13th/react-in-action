import rpc from '../../../utils/rpc';


import REQUEST_URL from '../../../constant/sysVar';


//查询根节点
export async function queryRoot(params) {
  return rpc.fetch(REQUEST_URL.NOTE.QUERYROOT, params);
}





