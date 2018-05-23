import {combineReducers} from 'redux'
import {userListReducer,userNameReducer} from '../components/UserManager/UserList'
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
    userName : userNameReducer
});