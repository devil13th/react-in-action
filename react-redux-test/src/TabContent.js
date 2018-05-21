import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import {
    createTabActiveAction,
    createTabAddAction,
    createTabRemoveAction
} from './action'
class TabContent extends React.Component{
    
    render(){
        return (
            <div>
                <h3 onClick={this.props.activeTab}>
                    {this.props.title}
                </h3>
                <span onClick={this.props.removeTab}>[删除]</span>
                <div style={{display:this.props.open?"block":"none"}}>
                    {this.props.content}
                </div>
                <hr/>
            </div>
        );
    }

}


const mapStoreToProps = function(state,ownProps){
    return {};
}

const mapDispatchToProps = function(dispatch,ownProps){
    return{
        removeTab:function(){
            dispatch(createTabRemoveAction(ownProps.idx))
        },

        activeTab : function(){
            dispatch(createTabActiveAction(ownProps.idx))
        }
    }
}


export default connect(mapStoreToProps,mapDispatchToProps)(TabContent);