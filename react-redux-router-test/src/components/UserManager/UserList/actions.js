const USERLIST_QUERY = "USERLIST_QUERY";
const USERLIST_ADD = "USERLIST_ADD";
const USERLIST_DELETE = "USERLIST_DELETE";
const USERLIST_UPDATE = "USERLIST_UPDATE";

const createUserListQueryAction = (userName) => {
    return{
        type : USERLIST_QUERY,
        userName 
    }
}

const createUserListAddAction = (user) => {
    return{
        type : USERLIST_ADD,
        user 
    }
}

const createUserListDeleteAction = (userId) => {
    return{
        type : USERLIST_DELETE,
        userId 
    }
}

const createUserListUpdateAction = (user) => {
    return{
        type : USERLIST_UPDATE,
        user  
    }
}



export {
    USERLIST_QUERY,
    USERLIST_ADD,
    USERLIST_DELETE,
    USERLIST_UPDATE,
    createUserListQueryAction,
    createUserListAddAction,
    createUserListUpdateAction,
    createUserListDeleteAction
}