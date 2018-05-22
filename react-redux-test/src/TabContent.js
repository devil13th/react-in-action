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
                <h3 style={{padding:0,margin:0}} onClick={this.props.activeTab} style={{cursor:"pointer"}}>
                   Title: {this.props.title}
                </h3> 
                <div style={{padding:5,display:this.props.open?"block":"none"}}>
                    Content:<br/> <br/>   
                    <div style={{padding:10}}>
                        {this.props.content}
                    </div>
                    <br/>
                    <span onClick={this.props.removeTab}>[删除]</span>
                </div>
                <hr/>
            </div>
        );
    }

}


const mapStateToProps = function(state,ownProps){
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


export default connect(mapStateToProps,mapDispatchToProps)(TabContent);