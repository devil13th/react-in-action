import React from 'react';
import { connect } from 'dva';
import { Divider,Row,Col,Modal, Tabs, Icon, Drawer, Button } from 'antd';
import ModNoteListList from './view/ModNoteListList';
import ModNoteListSearch from './view/ModNoteListSearch';
import ModNoteListForm from './view/ModNoteListForm';
import NoteContentViewRouter from './NoteContentViewRouter';
import CFG from '../../../constants';

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class ModNoteListRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           modNoteListFormVisible: false
        }
    }

    componentDidMount() {
        //查询列表
        this.props.dispatch({
            type: "modNoteListModel/queryList"
        });

        //查询字典分类下拉菜单数据
        this.props.dispatch({
            type: "modNoteListModel/queryDicClassify"
        });
    }


    //分页,排序,筛选改变时触发
    changePageAndSort = (pagination, filters, sorter) => {
        this.props.dispatch({
            type: "modNoteListModel/setPageAndSort",
            payload: {
                current: pagination.current,
                pageSize: pagination.pageSize,
                sortColumn: sorter.field,
                sortOrder: sorter.order
            }
        })
    }

    //打开编辑窗口
    openModNoteListForm = () => {
        this.props.dispatch({
            type: "modNoteListModel/mergeState",
            payload: {
                modNoteListFormVisible: true,
                entity: {},
                operateType: CFG.OPERATETYPE.SAVE
            }
        })
    }

    //关闭编辑窗口
    closeModNoteListForm = () => {
        this.props.dispatch({
            type: "modNoteListModel/mergeState",
            payload: {
                modNoteListFormVisible: false
            }
        })
    }

    //保存记事
    saveModNoteListForm = (obj) => {
        this.props.dispatch({
            type: "modNoteListModel/saveModNoteList",
            payload: obj
        })
    }

    //删除单条记录 - 记事
    deleteModNoteList = (id) => {
        this.props.dispatch({
            type: "modNoteListModel/deleteModNoteList",
            payload: id
        })
    }

    //删除多条记录 - 记事
    deleteModNoteListBatch = (id) => {
        this.props.dispatch({
            type: "modNoteListModel/deleteModNoteListBatch",
            payload: id
        })
    }



    //编辑记事
    editModNoteList = (id) => {
        this.props.dispatch({
            type: "modNoteListModel/editModNoteList",
            payload: id
        })
    }

    //查询记事
    searchModNoteList = (queryCondition) => {
        this.props.dispatch({
            type: "modNoteListModel/setQueryCondition",
            payload: { ...queryCondition }
        })
    }
    //勾选/取消勾选列表
    onChangeSelectedRow = (selectedEntityIds) => {
        this.props.dispatch({
            type: "modNoteListModel/mergeState",
            payload: {
                selectedEntityIds
            }
        })
    }
    //单击行
    listRowClick = (record) => {
        this.props.dispatch({
            type: "modNoteListModel/loadNoteContent",
            payload: {id:record.NOTE_ID}
        })
    }
    //展开事件
    onExpand = (expanded,record) => {
        this.props.dispatch({
            type: "modNoteListModel/loadNoteContent",
            payload: {id:record.NOTE_ID}
        })
    }

    changeLayout = (layout) => {
        this.props.dispatch({
            type: "modNoteListModel/mergeState",
            payload: {
                layout
            }
        })
    }

    render() {


        //dva组件state
        const state = this.props.modNoteListModel;
        //组件state字符串
        var stateStr = JSON.stringify(state);

        const { current, pageSize, total } = this.props.modNoteListModel.queryExtraBean;

        //列表查询loading
        const queryListLoading = this.props.loading.effects['modNoteListModel/queryList']
        ||  this.props.loading.effects['reactCodegenTestModel/editModNoteList']
        ||  this.props.loading.effects['reactCodegenTestModel/deleteModNoteList']
        ||  this.props.loading.effects['reactCodegenTestModel/deleteModNoteListBatch'];
        
        //保存实体loading
        const onSaveLoading = this.props.loading.effects['modNoteListModel/saveModNoteList'];

        //布局

        const layout = this.props.modNoteListModel.layout;
        let leftSpan = 24;
        if(layout == "read"){
            leftSpan = 14;
        }





        //左面布局内容
        const allComponent = [(
            <Col span={leftSpan}>
                <ModNoteListSearch
                    queryCondition={this.props.modNoteListModel.queryConditionBean}
                    searchModNoteList={this.searchModNoteList}
                    openModNoteListForm={this.openModNoteListForm}
                    selectedEntityIds={this.props.modNoteListModel.selectedEntityIds}
                    deleteModNoteListBatch={this.deleteModNoteListBatch}
                    dicClassifyDataSource={this.props.modNoteListModel.dicClassifyDataSource}
                    queryListLoading={queryListLoading}
                    changeLayout={this.changeLayout}
                    layout={this.props.modNoteListModel.layout}
                >
                </ModNoteListSearch>
                <ModNoteListList
                    queryExtraBean={this.props.modNoteListModel.queryExtraBean}
                    queryListLoading={queryListLoading}
                    changePageAndSort={this.changePageAndSort}
                    pagination={{
                        current, pageSize, total
                    }}
                    listDataSource={this.props.modNoteListModel.listDataSource}
                    deleteModNoteList={this.deleteModNoteList}
                    editModNoteList={this.editModNoteList}
                    selectedEntityIds={this.props.modNoteListModel.selectedEntityIds}
                    onChangeSelectedRow={this.onChangeSelectedRow}
                    onExpand = {this.onExpand}
                    layout = {layout}
                    rowClick={this.listRowClick}
                >

                </ModNoteListList>

                {/* 
                <Modal
                    title="公共字典信息"
                    visible={this.props.modNoteListModel.modNoteListFormVisible}
                    destroyOnClose={true}
                    footer={false}
                    onCancel={this.closeModNoteListForm}
                    maskClosable={false}
                    width={1000}
                >
                    <ModNoteListForm
                        entity={this.props.modNoteListModel.entity}
                        onSave={this.saveModNoteListForm}
                        onCancel={this.closeModNoteListForm}
                    >
                    </ModNoteListForm>
                </Modal>
                */}


                <Drawer
                    title="公共字典信息"
                    placement="right"
                    width={350}
                    destroyOnClose={true}
                    onClose={this.closeModNoteListForm}
                    visible={this.props.modNoteListModel.modNoteListFormVisible}
                >

                    <ModNoteListForm
                        entity={this.props.modNoteListModel.entity}
                        onSave={this.saveModNoteListForm}
                        onCancel={this.closeModNoteListForm}
                        onSaveLoading={onSaveLoading}
                    >
                    </ModNoteListForm>
                </Drawer>

                {/* <div>{stateStr}</div> */}

            </Col>
        )]

        if(layout == "read"){

            allComponent.push(
                <Col span={1}>
                    
                </Col>
            );
            allComponent.push(
                <Col span={9}>
                    <NoteContentViewRouter
                        text={this.props.modNoteListModel.clickRowContent}
                        noteId={this.props.modNoteListModel.clickRowId}
                    >
                    </NoteContentViewRouter>
                </Col>
            );
        }


 

        return (
            <div className="mainContent">
            <Row> 
                
                {allComponent}


            </Row>
            </div>
        )
    }
}


export default connect(({ modNoteListModel, loading }) => ({
    modNoteListModel,
    loading
}))(ModNoteListRouter);