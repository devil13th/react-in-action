export const tabOperator = {
    ADD_TAB : Symbol(),
    ACTIVE_TAB : Symbol()
}

export const tabActionCreator = {
    createAddTabAction : (obj)=>{
        return {
            type:tabOperator.ADD_TAB,
            tabObj : obj
        }
    },
    createActiveTabAction : (i)=>{
        return {
            type:tabOperator.ADD_TAB,
            tabIndex : i
        }
    }
}





