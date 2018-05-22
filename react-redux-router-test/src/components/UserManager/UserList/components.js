import React from 'react';
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
import {connect} from 'react-redux'




class UserList extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(

            <div>{this.props.userList.map((user) => {return `${user.userName} | ${user.bir} | ${user.sex}`})}</div>
        )
    }
}


const mapStateToProps =(state,ownProps) => {
    return {
        //userList : state.userList.filter((user) => { return user.userName.indexOf(state.userName) != -1})
        userList : state.userList.filter((user) => { return true})
    
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return{
        queryUserList : () => {
            dispatch(createUserListQueryAction(ownProps.userName));
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserList);