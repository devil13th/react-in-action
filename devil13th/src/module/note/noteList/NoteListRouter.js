import React from 'react';
import { connect } from 'dva';

import { Row, Col,Drawer,Button} from 'antd';
import Search from './view/Search';
import NoteList from './view/NoteList';
import NoteContentForm from './view/NoteContentForm';


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
        //console.log(node.props.title)
    } 
    //显示创建记事面板
    showCreateNotePanel = () => {
        this.props.dispatch({
            type:"noteListModel/mergeState",
            payload : {
                createNotePanelVisible:true,
                noteContent:{ 
                    noteTitle:"1",
                    noteClassify:"2",
                    noteDesc:"摘要",
                    noteId:"",
                    isDelete:1,
                    alarmDays:1,
                    expireDate:"2019-01-01"
                }
            }
        })
    }
    //
    createNotePanelHandleOk = (note) => {
        //console.log(note);
        this.props.dispatch({
            type:"noteListModel/mergeState",
            payload : {
                createNotePanelVisible:false
            }
        })
    }

    //
    createNotePanelHandleCancel = () => {
        this.props.dispatch({
            type:"noteListModel/mergeState",
            payload : {
                createNotePanelVisible:false
            }
        })
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
                    createNote={this.showCreateNotePanel}
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


                <NoteContentForm
                    visible = {this.props.noteListModel.createNotePanelVisible}
                    handleOk = {this.createNotePanelHandleOk}
                    handleCancel  = {this.createNotePanelHandleCancel}
                    noteContent = {this.props.noteListModel.noteContent}
                >
                </NoteContentForm>

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