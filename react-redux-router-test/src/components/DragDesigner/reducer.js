import  {
    ADD_DRAG_DESIGNER_COMPONENT__ACTION,
    REMOVE_DRAG_DESIGNER_COMPONENT__ACTION,
    MOVE_DRAG_DESIGNER_COMPONENT__ACTION
} from './action'

import {uuid,lowerDimension} from '../../helper';
import _ from 'lodash';
const designerViewDataInit = [];
const designerViewDataReducer = (state = designerViewDataInit ,action) =>{
    switch(action.type){
        case ADD_DRAG_DESIGNER_COMPONENT__ACTION : {
            const designerViewData = _.cloneDeep(state);
            designerViewData.push(action.componentObj);
            return designerViewData;
        }
        case MOVE_DRAG_DESIGNER_COMPONENT__ACTION : {
            const designerViewDataList = lowerDimension(state,"childrens");
            console.log(designerViewDataList);

            const designerViewData_temp = _.cloneDeep(state);

            

            return state;
        }
        
        

        default : {
            return state;
        }
    }
}


export {designerViewDataReducer as designerViewDataReducer}