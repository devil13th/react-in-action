// -------------------------------  数据视图 - 保存单个数据集 --------------------------
const SAVE__DATA_VIEW_DATA_COLLECTION__ACTION = "SAVE__DATA_VIEW_DATA_COLLECTION__ACTION";
// -------------------------------  数据视图 - 删除数据集 --------------------------
const DELETE__DATA_VIEW_DATA_COLLECTION__ACTION = "DELETE__DATA_VIEW_DATA_COLLECTION__ACTION";
// -------------------------------  数据视图 - 数据集数据集合初始化 --------------------------
const DATA_COLLECTION_LIST_INIT = "DATA_COLLECTION_LIST_INIT";
// -------------------------------  数据视图 - 保存基本信息表单 --------------------------
const SAVE__DATA_VIEW_BASE_INFO_FORM__ACTION = "SAVE__DATA_VIEW_BASE_INFO_FORM__ACTION";
// -------------------------------  数据视图 - 实体集合初始化 --------------------------
const ENITY_LIST_INIT = "ENITY_LIST_INIT";
// -------------------------------  数据视图 - 搜索数据集 --------------------------
const SEARCH__DATA_VIEW_ENITY__ACTION = "SEARCH__DATA_VIEW_ENITY__ACTION";

/**
 * 
 * @param {*} dataCollection : 数据集对象
 * @param {*} operateType : add or edit
 */
const createSaveDataCollectionAction = (dataCollection,operateType) => {
  return {
    type:SAVE__DATA_VIEW_DATA_COLLECTION__ACTION,
    dataCollection,
    operateType 
  }
}

/**
 * 
 * @param {*} dataCollectionKey : 数据集key
 */
const createDeleteDataCollectionAction = (dataCollectionKey) => {
  return {
    type:DELETE__DATA_VIEW_DATA_COLLECTION__ACTION,
    dataCollectionKey
  }
}

const creatSaveViewBaseInfoFormAction = (formData) => {
  return {
    type:SAVE__DATA_VIEW_BASE_INFO_FORM__ACTION,
    formData 
  }
}


const createEnityListInitAction = (enityList) => {
  return {
    type:ENITY_LIST_INIT,
    enityList
  }
}

/**
 * 
 * @param {*} kw : 关键字
 */
const createSearchDataViewEnityAction = (dataViewSearchKeyWord) => {
  return {
    type:SEARCH__DATA_VIEW_ENITY__ACTION,
    dataViewSearchKeyWord
  }
}

export{
    SAVE__DATA_VIEW_BASE_INFO_FORM__ACTION as SAVE__DATA_VIEW_BASE_INFO_FORM__ACTION,
    DATA_COLLECTION_LIST_INIT as DATA_COLLECTION_LIST_INIT,
    SAVE__DATA_VIEW_DATA_COLLECTION__ACTION as SAVE__DATA_VIEW_DATA_COLLECTION__ACTION,
    ENITY_LIST_INIT as ENITY_LIST_INIT,
    DELETE__DATA_VIEW_DATA_COLLECTION__ACTION as DELETE__DATA_VIEW_DATA_COLLECTION__ACTION,
    SEARCH__DATA_VIEW_ENITY__ACTION as SEARCH__DATA_VIEW_ENITY__ACTION,
    creatSaveViewBaseInfoFormAction as creatSaveViewBaseInfoFormAction,
    createSaveDataCollectionAction as createSaveDataCollectionAction,
    createDeleteDataCollectionAction as createDeleteDataCollectionAction,
    createSearchDataViewEnityAction as createSearchDataViewEnityAction
    
}