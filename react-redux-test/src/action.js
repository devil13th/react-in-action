const TAB_ACTIVE_ACTION = "TAB_ACTIVE_ACTION";
const TAB_ADD_ACTION = "TAB_ADD_ACTION";
const TAB_REMOVE_ACTION = "TAB_REMOVE_ACTION";


const createTabActiveAction = (activeIndex) => {
    return {
        type:TAB_ACTIVE_ACTION,
        activeIndex
    }
}

const createTabAddAction = (title,content) => {
    return {
        type:TAB_ADD_ACTION,
        title,
        content
    }
}

const createTabRemoveAction = (id) => {
    return {
        type:TAB_REMOVE_ACTION,
        id
    }
}


export {
    TAB_ACTIVE_ACTION,
    TAB_ADD_ACTION,
    TAB_REMOVE_ACTION,

    createTabActiveAction,
    createTabAddAction,
    createTabRemoveAction
    
    
}
