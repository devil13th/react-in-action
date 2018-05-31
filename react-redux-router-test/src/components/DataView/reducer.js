import {
    SAVE__DATA_VIEW_BASE_INFO_FORM__ACTION,
    ENITY_LIST_INIT,
    SAVE__DATA_VIEW_DATA_COLLECTION__ACTION,
    DATA_COLLECTION_LIST_INIT,
    DELETE__DATA_VIEW_DATA_COLLECTION__ACTION
} from './action';









//------------------------------------------- 实体列表 ---------------------------------
const enityListInitData = [{
    title: 'SYS_USER',
    name : '用户信息',
    description: '系统用户信息表',
    key: '0-0-0',
    type:'table',
    children: [
      { title: 'ID',name:'用户ID',description:'用户唯一标识',type:'column', dataType:'String' ,key: '0-0-0-0' ,selectable : false},
      { title: 'NAME',name:'用户姓名',description:'用户姓名',type:'column', dataType:'String', key: '0-0-0-1',selectable : false },
      { title: 'AGE',name:'用户年龄',description:'用户年龄',type:'column', dataType:'Integer', key: '0-0-0-2' ,selectable : false},
      { title: 'SEX',name:'用户性别',description:'用户性别',type:'column', dataType:'String', key: '0-0-0-3' ,selectable : false},
    ],
  }, {
    title: 'SYS_MENU',
    name :'菜单信息',
    description : '系统菜单表',
    type:'table',
    key: '0-0-1',
    children: [
      { title: 'ID', name:'菜单ID',description:'菜单唯一标识',type:'column', dataType:'String',key: '0-0-1-0' ,selectable : false},
      { title: 'NAME', name:'菜单名称',description:'菜单名称',type:'column', dataType:'String',key: '0-0-1-1',selectable : false },
      { title: 'URL',name:'菜单URL',description:'菜单URL',type:'column', dataType:'String', key: '0-0-1-2',selectable : false },
    ],
  }, {
    title: 'SYS_ORG',
    name :'组织机构信息',
    description : '系统组织机构表',
    type:'table',
    key: '0-0-2',
    children: [
      { title: 'ID', name:'组织机构ID',description:'组织机构唯一标识',type:'column', dataType:'String',key: '0-0-2-0' ,selectable : false},
      { title: 'NAME', name:'组织机构名称',description:'组织机构名称',type:'column', dataType:'String',key: '0-0-2-1',selectable : false },
      { title: 'CLASSIFY',name:'组织机构类型',description:'组织机构类型',type:'column', dataType:'String', key: '0-0-2-2',selectable : false },
    ],
  }
];
const enityListReducer = function(state=enityListInitData,action){
    switch(action.type){
        case ENITY_LIST_INIT : {
            return state;
        }
        default: {
            return state;
        }
    }
}

//------------------------------------------- 数据集列表 ---------------------------------
//实体初始化数据(生产中使用ajax)
const dataCollectionListDataInit = [{
    title: 'SYS_USER',
    name : '用户信息',
    description: '系统用户信息表',
    key: '0-0-0',
    type:'table',
    children: [
      { title: 'ID',name:'用户ID',description:'用户唯一标识',type:'column', dataType:'String', key: '0-0-0-0' ,selectable : false},
      { title: 'NAME',name:'用户姓名',description:'用户姓名',type:'column', dataType:'String', key: '0-0-0-1',selectable : false },
      { title: 'AGE',name:'用户年龄',description:'用户年龄',type:'column', dataType:'Integer', key: '0-0-0-2' ,selectable : false},
      { title: 'SEX',name:'用户性别',description:'用户性别',type:'column', dataType:'String', key: '0-0-0-3' ,selectable : false},
    ],
  }, {
    title: 'SYS_MENU',
    name :'菜单信息',
    description : '系统菜单表',
    type:'table',
    key: '0-0-1',
    children: [
      { title: 'ID', name:'菜单ID',description:'菜单唯一标识',type:'column', dataType:'String',key: '0-0-1-0' ,selectable : false},
      { title: 'NAME', name:'菜单名称',description:'菜单名称',type:'column', dataType:'String',key: '0-0-1-1',selectable : false },
      { title: 'CREATE_DATE',name:'创建日期',description:'创建日期',type:'column', dataType:'String', key: '0-0-1-2',selectable : false ,
    
      children: [{
        title: 'CREATE_DATE_FROM',
        name: '创建日期上限',
        key: '0-0-1-2-1',
        type:'attribute',
        selectable : false 
      }, {
        title: 'CREATE_DATE_TO',
        name: '创建日期下限',
        age: 18,
        address: 'London No. 4 Lake Park',
        key: '0-0-1-2-2',
        type:'attribute',
        selectable : false 
      }]
      },
    ],
  }];



  
const dataCollectionListReducer = function(state=dataCollectionListDataInit,action){
    switch(action.type){
        case DATA_COLLECTION_LIST_INIT : {
            return state;
        }
        case SAVE__DATA_VIEW_DATA_COLLECTION__ACTION : {
            const dataCollectionList_temp = _.cloneDeep(state);
            return [...dataCollectionList_temp,action.dataCollection];
        }
        case DELETE__DATA_VIEW_DATA_COLLECTION__ACTION : {
            var dataCollectionList_temp = state.filter(item => {
                return item.key != action.dataCollectionkey;        
            })
            
            return dataCollectionList_temp;
        }

       

        default: {
            return state;
        }
    }
}

/**
 * 保存数据视图基本信息
 * @param {*} state : store.dataViewBaseInfo
 * @param {*} action : 数据视图基本信息
 */
const dataViewBaseInfoReducer = function(state={},action){
    switch(action.type){
        //保存数据视图基本信息
        case SAVE__DATA_VIEW_BASE_INFO_FORM__ACTION : {
            return action.formData;
        }
        default : {
            return state;
        }
    }
}

export{
    dataViewBaseInfoReducer as dataViewBaseInfoReducer,
    enityListReducer as enityListReducer,
    dataCollectionListReducer as dataCollectionListReducer
}