// -------------------------------  数据视图 - 视图数据 --------------------------

//加入新节点
const ADD_DRAG_DESIGNER_COMPONENT__ACTION = "ADD_DRAG_DESIGNER_COMPONENT__ACTION";

/**
 * @param {*} componentObj : 拖入的容器对象数据
 * @param {*} targetComponentKey : 目标对象key
 */
const createAddDragDesignerComponentAction = (componentObj,targetComponentId) => {
    //console.log(componentObj)
    return {
        type:ADD_DRAG_DESIGNER_COMPONENT__ACTION,
        componentObj,
        targetComponentId
    }
}
//删除节点
const REMOVE_DRAG_DESIGNER_COMPONENT__ACTION = "REMOVE_DRAG_DESIGNER_COMPONENT__ACTION";
/**
 * @param {*} removeComponentKey : 删除容器key
 */
const createRemoveDragDesignerComponentAction = (removeComponentKey) => {
    return {
        type:REMOVE_DRAG_DESIGNER_COMPONENT__ACTION,
        removeComponentKey 
    }
}
//移动节点
const MOVE_DRAG_DESIGNER_COMPONENT__ACTION = "MOVE_DRAG_DESIGNER_COMPONENT__ACTION";
/**
 * @param {*} dragDomId : 移动的容器对象数据
 * @param {*} targetDomId : 目标对象key
 */
const createMoveDragDesignerComponentAction = (dragDomId,targetDomId) => {
    return {
        type:MOVE_DRAG_DESIGNER_COMPONENT__ACTION,
        dragDomId,
        targetDomId 
    }
}


export {
    ADD_DRAG_DESIGNER_COMPONENT__ACTION,
    REMOVE_DRAG_DESIGNER_COMPONENT__ACTION,
    MOVE_DRAG_DESIGNER_COMPONENT__ACTION,
    createAddDragDesignerComponentAction,
    createRemoveDragDesignerComponentAction,
    createMoveDragDesignerComponentAction
}

