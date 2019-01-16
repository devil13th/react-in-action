import React from 'react';
import { connect } from 'dva';

import { Row, Col,Drawer,Button} from 'antd';
import {Search} from './view/Search';
import {NoteList} from './view/NoteList';



class NoteClassifyRouter extends React.Component{
    constructor(props){
        super(props); 
        //从props对象中获取dispatch属性
        const {dispatch} = this.props;
        this.dispatch = dispatch;
        //console.log(this.props.loading);
        this.state={
            visible:false
        }
        
    }

    componentDidMount(){
        this.dispatch({
            type:"noteListModel/queryNoteList"
        });
    }

    

    searchOrg = (v) => {
        this.props.dispatch({
            type:"sysUserModel/querySysOrgData",
            payload:v
        })
    }

    //查询列表
    queryList = (payload) =>{
        this.props.dispatch({
            type:"noteListModel/queryNoteList",
            payload
        })
    }
    //分页,排序,筛选改变时触发
    tableOnChange = (pagination, filters, sorter) => {
        //console.log("]]]]]]]]]]]]]]]")
        //console.log(pagination);
        //console.log(filters);
        //console.log(sorter);
        //console.log(sorter.field);
        //console.log(sorter.order);


        this.props.dispatch({
            type:"noteListModel/queryNoteListByPage",
            payload:{...pagination,sortColumn:sorter.field,sortOrder:sorter.order}
        })
        
    }
    //打开行信息
    onExpand = (expanded, record) => {
        //console.log(expanded);
        //console.log(record.NOTE_ID);


        this.props.dispatch({
            type:"noteListModel/loadNoteContent",
            payload:record.NOTE_ID
        })

    }

    //清空查询条件
    clearQueryParamsForNoteList = () => {
        this.props.dispatch({
            type:"noteListModel/clearQueryParamsForNoteList"
        })
    }

    //右键事件
    onRightClick = ({event, node}) => {
        //console.log(event);
        //console.log(node);
        //alert(node.props.title)
    }
    

    onClose = () => {
        this.setState({
          visible: false,
        });
    };

    showDrawer = () => {
        this.setState({
          visible: true,
        });
    };

    render(){
        const queryModNoteListLoading = this.props.loading.effects['noteListModel/queryNoteList'] 
                                        || this.props.loading.effects['noteListModel/queryNoteListByPage']
                                        || this.props.loading.effects['noteListModel/clearQueryParamsForNoteList']
        const {current,pageSize,total} = this.props.noteListModel.queryBean;
        //console.log("***",current,pageSize,total)
        return(
            <div style={{background:"#fff",padding:8}}>
                
                <Search
                    showDrawer={this.showDrawer}
                    queryList = {this.queryList}
                    clearQueryParams = {this.clearQueryParamsForNoteList}
                    queryParams = {this.props.noteListModel.queryBean.queryParams}
                    loading={queryModNoteListLoading}
                >
                </Search>
                   
                <NoteList
                    pagination={{
                        current,pageSize,total
                    }}
                    loading={queryModNoteListLoading}
                    onExpand = {this.onExpand}
                    sortColumn={this.props.noteListModel.queryBean.sortColumn}
                    sortOrder = {this.props.noteListModel.queryBean.sortOrder}
                    data={this.props.noteListModel.noteList}
                    tableOnChange={this.tableOnChange}
                >
                </NoteList>


                <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                width="50%"
                maskClosable={false}
                closable={true}
                mask={false}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <Button onClick={this.onClose}>关闭 </Button>
                </Drawer>
               {/*
                <div>
                    {JSON.stringify(this.props.noteListModel)}
                </div>
               */}
            </div>
        );
    }
}


export default connect(({noteListModel,loading }) => ({
    noteListModel,
    loading 
  }))(NoteClassifyRouter);