import {
    USERLIST_QUERY,
    USERLIST_ADD,
    USERLIST_DELETE,
    USERLIST_UPDATE,
    createUserListQueryAction,
    createUserListAddAction,
    createUserListUpdateAction,
    createUserListDeleteAction
}from './actions'

const userListReducer = function(state = [{userName:"张三",bir:"2018-01-01",sex:"1"}] , action){
    switch(action.type){
        case "USERLIST_ADD" : {
            return [...state,action.user];
        }
        case "USERLIST_UPDATE" : {
            return state.map((user) => {

            })
        }
        case "USERLIST_DELETE" : {

        }
        default : {
            return state;
        }
    }
}

const userNameReducer = function(state = "" , action) {
    switch(action.type){
        case "USERLIST_QUERY" : {
            return action.userName;
        }
        default : {
            return state;
        }
    }
}

export{userListReducer,userNameReducer}

