import { createStore } from 'redux'


const actionType = {
    ADD:Symbol(),
    UPDATE:Symbol(),
    DELETE:Symbol(),
    OTHER : Symbol()
}


const createOtherAction = (x) => {
    return {
        type:actionType.OTHER,
        data:x
    }
}


const createAddAction = (user) => {
    return {
        type:actionType.ADD,
        data:user
    }
}

const createDeleteAction = (id) => {
    return {
        type:actionType.DELETE,
        id : id
    }
}

const createUpdateAction = (user) => {
    return {
        type:actionType.UPDATE,
        data : user
    }
}


const reducers = (state = [],action) => {
    switch(action.type){
        case actionType.OTHER : {
            return action.data;
        }
        case actionType.ADD : {
            console.log("ADD...");
            return [...state,action.data];
        }
        case actionType.UPDATE : {
            console.log("UPDATE...");
            return state.map((item) => {
                if(item.id === action.data.id){
                    return action.data;
                }else{
                    return item;
                }
            })
        }
        case actionType.DELETE : {
            console.log("DELETE...");
            return state.filter((item) => {
               return item.id != action.id
            })
        };
        default : {
            return state;
        }
        
    }
}


const store = createStore(reducers);


store.subscribe(() => {
    console.log(" trigger1 :",store.getState());
});


store.subscribe(() => {
    console.log(" trigger2 : 执行");
});

store.subscribe(() => {
    console.log(" trigger3 : 执行");
});

store.dispatch(createAddAction({id:1,userName:"devil13th"}));

console.log(store.getState());

store.dispatch(createAddAction({id:2,userName:"jean"}));
console.log(store.getState());

store.dispatch(createAddAction({id:3,userName:"eric"}));
console.log(store.getState());

store.dispatch(createUpdateAction({id:2,userName:"update jean"}));
console.log(store.getState());

store.dispatch(createDeleteAction(2));
console.log(store.getState());

store.dispatch(createOtherAction('xxx'));

store.dispatch(createAddAction({id:1,userName:"devil13th"}));



