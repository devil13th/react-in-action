import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TabContent from './TabContent';
import {
    createTabActiveAction,
    createTabAddAction,
    createTabRemoveAction
} from './action'

class Tab extends React.Component{
    
    render(){
        const doms = [];

        this.props.tabList.map((item,index)=>{
            if(item.valid){
                doms.push(<TabContent key={item.idx} idx={item.idx} title={item.title} open={item.open} content={item.content + "|||" + item.idx}></TabContent>);
            }
        })


        return (

            <div>
                
                <button onClick={this.props.addTabContent}>添加</button>选项卡数量:{this.props.tabCounter}
                <hr/>
                {doms}
            </div>
        );
    }

}

const mapStateToProps = function(state,ownerProps){
    return {
        tabCounter : (function(){
            const ar =  state.tabList.filter((item)=>{return item.valid});
            console.log("-----------");
            console.log(ar);
            return ar.length;
        })(),
        tabIndex : state.tabIndex,
        tabList : state.tabList
    }
}

const mapDispatchToProps = function(dispatch,ownerProps){
    return {
        addTabContent : () => {
           dispatch(createTabAddAction("x","y"))
           dispatch(createTabAddAction("a","b"))
           dispatch(createTabAddAction("c","d"))
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Tab);