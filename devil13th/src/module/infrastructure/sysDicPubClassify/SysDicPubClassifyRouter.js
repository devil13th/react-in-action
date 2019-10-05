import React from 'react';
import { connect } from 'dva';
import { Modal, Tabs, Icon, Drawer, Button } from 'antd';
import SysDicPubClassifyList from './view/SysDicPubClassifyList';
import SysDicPubClassifySearch from './view/SysDicPubClassifySearch';
import SysDicPubClassifyForm from './view/SysDicPubClassifyForm';
import CFG from '../../../constants';

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class SysDicPubClassifyRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           sysDicPubClassifyFormVisible: false
        }
    }

    componentDidMount() {
        //查询列表
        this.props.dispatch({
            type: "sysDicPubClassifyModel/queryList"
        });

        //查询字典分类下拉菜单数据
        this.props.dispatch({
            type: "sysDicPubClassifyModel/queryDicClassify"
        });
    }


    //分页,排序,筛选改变时触发
    changePageAndSort = (pagination, filters, sorter) => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/setPageAndSort",
            payload: {
                current: pagination.current,
                pageSize: pagination.pageSize,
                sortColumn: sorter.field,
                sortOrder: sorter.order
            }
        })
    }

    //打开编辑窗口
    openSysDicPubClassifyForm = () => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/mergeState",
            payload: {
                sysDicPubClassifyFormVisible: true,
                entity: {},
                operateType: CFG.OPERATETYPE.SAVE
            }
        })
    }

    //关闭编辑窗口
    closeSysDicPubClassifyForm = () => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/mergeState",
            payload: {
                sysDicPubClassifyFormVisible: false
            }
        })
    }

    //保存公共字典分类
    saveSysDicPubClassifyForm = (obj) => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/saveSysDicPubClassify",
            payload: obj
        })
    }

    //删除单条记录 - 公共字典分类
    deleteSysDicPubClassify = (id) => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/deleteSysDicPubClassify",
            payload: id
        })
    }

    //删除多条记录 - 公共字典分类
    deleteSysDicPubClassifyBatch = (id) => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/deleteSysDicPubClassifyBatch",
            payload: id
        })
    }



    //编辑公共字典分类
    editSysDicPubClassify = (id) => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/editSysDicPubClassify",
            payload: id
        })
    }

    //查询公共字典分类
    searchSysDicPubClassify = (queryCondition) => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/setQueryCondition",
            payload: { ...queryCondition }
        })
    }
    //勾选/取消勾选列表
    onChangeSelectedRow = (selectedEntityIds) => {
        this.props.dispatch({
            type: "sysDicPubClassifyModel/mergeState",
            payload: {
                selectedEntityIds
            }
        })
    }



    render() {


        //dva组件state
        const state = this.props.sysDicPubClassifyModel;
        //组件state字符串
        var stateStr = JSON.stringify(state);

        const { current, pageSize, total } = this.props.sysDicPubClassifyModel.queryExtraBean;

        //列表查询loading
        const queryListLoading = this.props.loading.effects['sysDicPubClassifyModel/queryList']
        ||  this.props.loading.effects['sysDicPubClassifyModel/editSysDicPubClassify']
        ||  this.props.loading.effects['sysDicPubClassifyModel/deleteSysDicPubClassify']
        ||  this.props.loading.effects['sysDicPubClassifyModel/deleteSysDicPubClassifyBatch'];
        //保存实体loading
        const saveEntityLoading = this.props.loading.effects['sysDicPubClassifyModel/saveSysDicPubClassify'];
        return (
            <div className="mainContent">

                <SysDicPubClassifySearch
                    queryCondition={this.props.sysDicPubClassifyModel.queryConditionBean}
                    searchSysDicPubClassify={this.searchSysDicPubClassify}
                    openSysDicPubClassifyForm={this.openSysDicPubClassifyForm}
                    selectedEntityIds={this.props.sysDicPubClassifyModel.selectedEntityIds}
                    deleteSysDicPubClassifyBatch={this.deleteSysDicPubClassifyBatch}
                    dicClassifyDataSource={this.props.sysDicPubClassifyModel.dicClassifyDataSource}
                    queryListLoading={queryListLoading}
                >
                </SysDicPubClassifySearch>
                <SysDicPubClassifyList
                    queryExtraBean={this.props.sysDicPubClassifyModel.queryExtraBean}
                    queryListLoading={queryListLoading}
                    changePageAndSort={this.changePageAndSort}
                    pagination={{
                        current, pageSize, total
                    }}
                    listDataSource={this.props.sysDicPubClassifyModel.listDataSource}
                    deleteSysDicPubClassify={this.deleteSysDicPubClassify}

                    editSysDicPubClassify={this.editSysDicPubClassify}
                    selectedEntityIds={this.props.sysDicPubClassifyModel.selectedEntityIds}
                    onChangeSelectedRow={this.onChangeSelectedRow}

                >

                </SysDicPubClassifyList>

                {/* 
                <Modal
                    title="公共字典信息"
                    visible={this.props.sysDicPubClassifyModel.sysDicPubClassifyFormVisible}
                    destroyOnClose={true}
                    footer={false}
                    onCancel={this.closeSysDicPubClassifyForm}
                    maskClosable={false}
                    width={1000}
                >
                    <SysDicPubClassifyForm
                        entity={this.props.sysDicPubClassifyModel.entity}
                        onSave={this.saveSysDicPubClassifyForm}
                        onCancel={this.closeSysDicPubClassifyForm}
                    >
                    </SysDicPubClassifyForm>
                </Modal>
                */}


                <Drawer
                    title="公共字典信息"
                    placement="right"
                    width={350} 
                    destroyOnClose={true}
                    onClose={this.closeSysDicPubClassifyForm}
                    visible={this.props.sysDicPubClassifyModel.sysDicPubClassifyFormVisible}
                >

                    <SysDicPubClassifyForm
                        entity={this.props.sysDicPubClassifyModel.entity}
                        onSave={this.saveSysDicPubClassifyForm}
                        onCancel={this.closeSysDicPubClassifyForm}
                    >
                    </SysDicPubClassifyForm>
                </Drawer>

                {/* <div>{stateStr}</div> */}
            </div>
        )
    }
}


export default connect(({ sysDicPubClassifyModel, loading }) => ({
    sysDicPubClassifyModel,
    loading
}))(SysDicPubClassifyRouter);