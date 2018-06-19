import {makeReducer} from '../../../helper/index';






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



const ACTION_HANDLERS = {
    // [ADD_CONTROLS]:(state,action) =>{
    //     return state;
    // }
    /**
     * 保存数据视图基本信息
     * @param {*} state : store.dataViewBaseInfo
     * @param {*} action.formData : 数据视图基本信息
     */
    [SAVE__DATA_VIEW_BASE_INFO_FORM__ACTION] : (state,action) => {
        //保存formData
        const state_temp = _.cloneDeep(state);
        state_temp.dataViewBaseInfo = action.formData
        return state_temp;
    },
    [SAVE__DATA_VIEW_DATA_COLLECTION__ACTION] : (state,action) => {
        //新增或编辑dataCollectionList

        //alert(action.operateType)
        const state_temp = _.cloneDeep(state);

        
        if(action.operateType == "add"){//新增数据集
            const dataCollectionList_temp = state_temp.dataCollectionList;
            state_temp.dataCollectionList = [...dataCollectionList_temp,action.dataCollection];
        }else if(action.operateType == "edit"){//编辑数据集
            const dataCollectionList_temp = state_temp.dataCollectionList;
            state_temp.dataCollectionList = dataCollectionList_temp.map(item => {
                return item.key == action.dataCollection.key ? action.dataCollection : item
            })
        }
        return state_temp;
    },


    [DELETE__DATA_VIEW_DATA_COLLECTION__ACTION] : (state,action) =>{
        //删除dataCollectionList

        const state_temp = _.cloneDeep(state);
        const dataCollectionList_temp = state_temp.dataCollectionList;
        var dataCollectionListResult = dataCollectionList_temp.filter(item => {
            //alert(item.key + "| " + action.dataCollectionKey)
            //alert(item.key != action.dataCollectionKey)
            return item.key != action.dataCollectionKey;        
        })
        state_temp.dataCollectionList = dataCollectionListResult;
        return state_temp;
    },
    [SEARCH__DATA_VIEW_ENITY__ACTION] :  (state,action) =>{
        //保存 dataViewSearchKeyWord

        const state_temp = _.cloneDeep(state);
        state_temp.dataViewSearchKeyWord = action.dataViewSearchKeyWord
        return state_temp;
    },
    [DATA_COLLECTION_LIST_INIT ] :  (state,action) =>{
        const state_temp = _.cloneDeep(state);
        state_temp.enityList = state.enityListInitData;
        return state_temp;
    }


    



}

//模块整体的state 
const initialState = {
    //实体列表
    enityList : [{
        title: '用户信息',
        name : 'SYS_USER',
        description: '系统用户信息表',
        key: '0-0-0',
        type:'table',
        children: [
          { title: '用户ID',name:'ID',description:'用户唯一标识',type:'column', dataType:'String' ,key: '0-0-0-0' ,selectable : false},
          { title: '用户姓名',name:'NAME',description:'用户姓名',type:'column', dataType:'String', key: '0-0-0-1',selectable : false },
          { title: '用户年龄',name:'AGE',description:'用户年龄',type:'column', dataType:'Integer', key: '0-0-0-2' ,selectable : false},
          { title: '用户性别',name:'SEX',description:'用户性别',type:'column', dataType:'String', key: '0-0-0-3' ,selectable : false},
        ],
      }, {
        title: '菜单信息',
        name :'SYS_MENU',
        description : '系统菜单表',
        type:'table',
        key: '0-0-1',
        children: [
          { title: '菜单ID', name:'ID',description:'菜单唯一标识',type:'column', dataType:'String',key: '0-0-1-0' ,selectable : false},
          { title: '菜单名称', name:'NAME',description:'菜单名称',type:'column', dataType:'String',key: '0-0-1-1',selectable : false },
          { title: '菜单URL',name:'URL',description:'菜单URL',type:'column', dataType:'String', key: '0-0-1-2',selectable : false },
        ],
      }, {
        title: '组织机构信息',
        name :'SYS_ORG',
        description : '系统组织机构表',
        type:'table',
        key: '0-0-2',
        children: [
          { title: '组织机构ID', name:'ID',description:'组织机构唯一标识',type:'column', dataType:'String',key: '0-0-2-0' ,selectable : false},
          { title: '组织机构名称', name:'NAME',description:'组织机构名称',type:'column', dataType:'String',key: '0-0-2-1',selectable : false },
          { title: '组织机构类型',name:'CLASSIFY',description:'组织机构类型',type:'column', dataType:'String', key: '0-0-2-2',selectable : false },
        ],
      }
    ],
    //数据集列表
    dataCollectionList : [{
        title: '用户信息',
        name : 'SYS_USER',
        description: '系统用户信息表',
        key: '0-0-0',
        type:'table',
        children: [
          { title: '用户ID',name:'ID',description:'用户唯一标识',type:'column', dataType:'String', key: '0-0-0-0' ,selectable : false},
          { title: '用户姓名',name:'NAME',description:'用户姓名',type:'column', dataType:'String', key: '0-0-0-1',selectable : false },
          { title: '用户年龄',name:'AGE',description:'用户年龄',type:'column', dataType:'Integer', key: '0-0-0-2' ,selectable : false},
          { title: '用户性别',name:'SEX',description:'用户性别',type:'column', dataType:'String', key: '0-0-0-3' ,selectable : false},
        ],
      }, {
        title: '菜单信息',
        name :'SYS_MENU',
        description : '系统菜单表',
        type:'table',
        key: '0-0-1',
        children: [
          { title: '菜单ID', name:'ID',description:'菜单唯一标识',type:'column', dataType:'String',key: '0-0-1-0' ,selectable : false},
          { title: '菜单名称', name:'NAME',description:'菜单名称',type:'column', dataType:'String',key: '0-0-1-1',selectable : false },
          { title: '创建日期',name:'CREATE_DATE',description:'创建日期',type:'column', dataType:'String', key: '0-0-1-2',selectable : false ,
        
          children: [{
            title: '创建日期上限',
            name: 'CREATE_DATE_FROM',
            key: '0-0-1-2-1',
            type:'attribute',
            selectable : false 
          }, {
            title: '创建日期下限',
            name: 'CREATE_DATE_TO',
            age: 18,
            address: 'London No. 4 Lake Park',
            key: '0-0-1-2-2',
            type:'attribute',
            selectable : false 
          }]
          },
        ],
      }
    ],
    //数据视图表单数据
    dataViewBaseInfo:{

    }
}

const dataViewReducer = makeReducer(ACTION_HANDLERS, initialState);
export  {dataViewReducer as dataViewReducer};