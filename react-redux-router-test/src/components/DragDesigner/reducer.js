import  {
    ADD_DRAG_DESIGNER_COMPONENT__ACTION,
    REMOVE_DRAG_DESIGNER_COMPONENT__ACTION,
    MOVE_DRAG_DESIGNER_COMPONENT__ACTION
} from './action'


import {uuid,lowerDimension,jsonArrayUtil} from '../../helper';
import _ from 'lodash';
const designerViewDataInit = [];



const designerViewDataReducer = (state = designerViewDataInit ,action) =>{
    switch(action.type){
        //添加组件
        case ADD_DRAG_DESIGNER_COMPONENT__ACTION : {
            const designerViewData = _.cloneDeep(state);
            if(action.componentObj.isAddComponent){//将菜单中的组件移动到设计区的组件中
                jsonArrayUtil.addObj("id",action.targetComponentId,designerViewData,"childrens",action.componentObj);
            }else{//将菜单中的组件拖到设计区空白处
                designerViewData.push(action.componentObj);
            }
            
            return designerViewData;
        }
        //移动组件
        case MOVE_DRAG_DESIGNER_COMPONENT__ACTION : {
            const designerViewDataList = lowerDimension(state,"childrens");
            //console.log("扁平化设计视图数据列表");
            //console.log(designerViewDataList);
            const designerViewData_temp = _.cloneDeep(state);
            //console.log("拖动节点ID,目标节点ID");
            //console.log(action.dragDomId,action.targetDomId );

            let dragDomData = jsonArrayUtil.findObj("id",action.dragDomId,designerViewData_temp,"childrens");
            const targetDomData = jsonArrayUtil.findObj("id",action.targetDomId,designerViewData_temp,"childrens");
            
            //console.log("拖动节点数据");
            //console.log(dragDomData);
            //console.log("目标节点数据");
            //console.log(targetDomData);

            //拷贝被移动的节点
            dragDomData = _.cloneDeep(dragDomData);
            
            let nodeTemp = {childrens:designerViewData_temp};
            //console.log(nodeTemp);
            //删除移动的节点
            jsonArrayUtil.deleteObj("id",action.dragDomId,nodeTemp,"childrens");
            //console.log(nodeTemp);
            //console.log("------------------xxxxxxxxxxx------------"); 
            //console.log(nodeTemp.childrens);
            
            //先新增移动的节点
            jsonArrayUtil.addObj("id",action.targetDomId,designerViewData_temp,"childrens",dragDomData);
            
 
            return nodeTemp.childrens;
        }
        //删除组件
        case REMOVE_DRAG_DESIGNER_COMPONENT__ACTION : {
            const designerViewData_temp  = _.cloneDeep(state);

            //console.log("=== 删除某节点 ===");
            var designerViewData_temp = {
                children:_.cloneDeep(state)
            }
            jsonArrayUtil.deleteObj("id","1.1",designerViewData_temp,"childrens");
            console.log(deleteJdTemp);
            return designerViewData_temp;
        }
        default : {
            return state;
        }
    }
}



const modalVisibleReducer = function(state = false,action){
    switch(action.type){
        case "SHOW_MODAL" : {
            return action.value;
        }
        default : {
            return state;
        }
    } 
}
export {designerViewDataReducer as designerViewDataReducer,
    modalVisibleReducer as modalVisibleReducer}