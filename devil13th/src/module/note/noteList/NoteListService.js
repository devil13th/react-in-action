import rpc from '../../../utils/rpc';


import REQUEST_URL from '../../../constant/sysVar';


//查询笔记列表
export async function rpcQueryModNoteList(params) {
  //console.log(params);
  const paramsStr = JSON.stringify(params);
  //console.log("query params : " + paramsStr);
  return rpc.fetch(REQUEST_URL.NOTE.QUERYNOTELIST, {queryBean:paramsStr});
}

//查询笔记详细信息
//查询笔记列表
export async function rpcQueryModNoteContentById(params) {
  return rpc.fetch(REQUEST_URL.NOTE.QUERYNOTECONTENT + params);
}






