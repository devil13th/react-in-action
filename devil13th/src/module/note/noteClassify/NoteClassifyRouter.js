import React from 'react';
import { connect } from 'dva';
import {NoteClassifyTree} from './view/NoteClassifyTree'
import { Row, Col} from 'antd';



class NoteClassifyRouter extends React.Component{
    constructor(props){
        super(props);
        //从props对象中获取dispatch属性
        const {dispatch} = this.props;
        this.dispatch = dispatch;
        console.log(this.props.loading);
        
    }

    componentDidMount(){
        this.dispatch({
            type:"noteClassifyModel/queryRoot",
            payload:{}
        });
    }

    

    searchOrg = (v) => {
        this.props.dispatch({
            type:"sysUserModel/querySysOrgData",
            payload:v
        })
    }

    //右键事件
    onRightClick = ({event, node}) => {
        console.log(event);
        console.log(node);
        //alert(node.props.title)
    }
    


    render(){
        return(
            <div style={{background:"#fff"}}>
                
                        <NoteClassifyTree 
                            onRightClick = {this.onRightClick}
                            treeData={this.props.noteClassifyModel.treeData}>
                        </NoteClassifyTree>
                   
                
            </div>
        );
    }
}


export default connect(({noteClassifyModel,loading }) => ({
    noteClassifyModel,
    loading 
  }))(NoteClassifyRouter);