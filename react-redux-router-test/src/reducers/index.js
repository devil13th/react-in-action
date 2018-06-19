import {combineReducers} from 'redux';
import {userListReducer,userNameReducer} from '../components/UserManager/UserList';

import {dataViewReducer} from '../components/DataView/modules/dataViewReducer'
import {dataCollection2ListReducer,creatSaveFormDataAction} from '../components/Layout/TransferTree';
import {saveFormDataReducer} from '../components/Layout/MyForm';
import {designerViewDataReducer,modalVisibleReducer} from '../components/DragDesigner';


//reducers

const initialState = {};
const textReducer  = (state = initialState, action) => {  
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                text: state.text=='Hello' ? 'world':'Hello'  
            }  
        case 'BUTTON_CLICK':  
            return {
                text: 'Hello world'  
            }  
        default:  
            return initialState;  
    }  
}

export default combineReducers({
    text : textReducer,
    userList : userListReducer,
    userName : userNameReducer,

    dataViewReducer : dataViewReducer,
   /* dataCollection2ListReducer:dataCollection2ListReducer,
    formData:saveFormDataReducer,
    enityList:enityListReducer,
    dataViewBaseInfo:dataViewBaseInfoReducer,
    dataCollectionList:dataCollectionListReducer,
    dataViewSearchKeyWord : dataViewSearchKeyWordReducer,*/


    designerViewData: designerViewDataReducer,
    modalVisible:modalVisibleReducer
});