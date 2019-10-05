import rpc from '../../../utils/rpc';
import REQUEST_URL from '../../../constant/sysVar';
//查询字典分类


//查询记事
export async function fetchQueryModNoteList(queryExtraBean, queryConditionBean) {
  return rpc.fetch(REQUEST_URL.MOD_NOTE_LIST.QUERY, { ...queryExtraBean, ...queryConditionBean });
}

//保存记事
export async function fetchSaveModNoteList(params) {
  return rpc.post(REQUEST_URL.MOD_NOTE_LIST.SAVE, params);
}

//删除记事
export async function fetchDeleteModNoteList(params) {
  return rpc.delete(REQUEST_URL.MOD_NOTE_LIST.DELETE + params);
}

//批量删除记事
export async function fetchDeleteModNoteListBatch(params) {
  return rpc.fetch(REQUEST_URL.MOD_NOTE_LIST.DELETEBATCH + params);
}

//查询单个记事
export async function fetchGetModNoteList(params) {
  return rpc.fetch(REQUEST_URL.MOD_NOTE_LIST.GET + "/" + params);
}

//更新记事
export async function fetchUpdateModNoteList(params) {
  return rpc.put(REQUEST_URL.MOD_NOTE_LIST.UPDATE, params);
}

//查询详细信息

export async function fetchQueryModNoteContentById(params) {
  return rpc.fetch(REQUEST_URL.MOD_NOTE_LIST.QUERYNOTECONTENT + params);
}

//保存记事内容
export async function fetchsaveModNoteContent(obj) {
  return rpc.post(REQUEST_URL.MOD_NOTE_LIST.SAVEMODNOTECONTENT,obj);
}




