import React from 'react';
import { connect } from 'dva';
import { Modal, Tabs, Icon, Drawer, Button } from 'antd';
import SysDicPubList from './view/SysDicPubList';
import SysDicPubSearch from './view/SysDicPubSearch';
import SysDicPubForm from './view/SysDicPubForm';
import CFG from '../../../constants';

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class SysDicPubRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sysDicPubFormVisible: false
        }
    }

    componentDidMount() {
        //查询列表
        this.props.dispatch({
            type: "sysDicPubModel/queryList"
        });

        //查询字典分类下拉菜单数据
        this.props.dispatch({
            type: "sysDicPubModel/queryDicClassify"
        });
    }


    //分页,排序,筛选改变时触发
    changePageAndSort = (pagination, filters, sorter) => {
        this.props.dispatch({
            type: "sysDicPubModel/setPageAndSort",
            payload: {
                current: pagination.current,
                pageSize: pagination.pageSize,
                sortColumn: sorter.field,
                sortOrder: sorter.order
            }
        })
    }

    //打开编辑窗口
    openSysDicPubForm = () => {
        this.props.dispatch({
            type: "sysDicPubModel/mergeState",
            payload: {
                sysDicPubFormVisible: true,
                entity: {},
                operateType: CFG.OPERATETYPE.SAVE
            }
        })
    }

    //关闭编辑窗口
    closeSysDicPubForm = () => {
        this.props.dispatch({
            type: "sysDicPubModel/mergeState",
            payload: {
                sysDicPubFormVisible: false
            }
        })
    }

    //保存
    saveSysDicPubForm = (obj) => {
        this.props.dispatch({
            type: "sysDicPubModel/saveSysDicPub",
            payload: obj
        })
    }

    //删除单条记录
    deleteSysDicPub = (id) => {
        this.props.dispatch({
            type: "sysDicPubModel/deleteSysDicPub",
            payload: id
        })
    }

    //删除多条记录
    deleteSysDicPubBatch = (id) => {
        this.props.dispatch({
            type: "sysDicPubModel/deleteSysDicPubBatch",
            payload: id
        })
    }



    //编辑公共字典
    editSysDicPub = (id) => {
        this.props.dispatch({
            type: "sysDicPubModel/editSysDicPub",
            payload: id
        })
    }

    //查询公共字典
    searchSysDicPub = (queryCondition) => {
        this.props.dispatch({
            type: "sysDicPubModel/setQueryCondition",
            payload: { ...queryCondition }
        })
    }
    //勾选/取消勾选列表
    onChangeSelectedRow = (selectedEntityIds) => {
        this.props.dispatch({
            type: "sysDicPubModel/mergeState",
            payload: {
                selectedEntityIds
            }
        })
    }



    render() {


        //dva组件state
        const state = this.props.sysDicPubModel;
        //组件state字符串
        var stateStr = JSON.stringify(state);

        const { current, pageSize, total } = this.props.sysDicPubModel.queryExtraBean;

        //列表查询loading
        const queryListLoading = this.props.loading.effects['sysDicPubModel/queryList'];
        return (
            <div className="mainContent">

                <SysDicPubSearch
                    queryCondition={this.props.sysDicPubModel.queryConditionBean}
                    searchSysDicPub={this.searchSysDicPub}
                    openSysDicPubForm={this.openSysDicPubForm}
                    selectedEntityIds={this.props.sysDicPubModel.selectedEntityIds}
                    deleteSysDicPubBatch={this.deleteSysDicPubBatch}
                    dicClassifyDataSource={this.props.sysDicPubModel.dicClassifyDataSource}
                    queryListLoading={queryListLoading}
                >
                </SysDicPubSearch>
                <SysDicPubList
                    queryExtraBean={this.props.sysDicPubModel.queryExtraBean}
                    queryListLoading={queryListLoading}
                    changePageAndSort={this.changePageAndSort}
                    pagination={{
                        current, pageSize, total
                    }}
                    listDataSource={this.props.sysDicPubModel.listDataSource}
                    deleteSysDicPub={this.deleteSysDicPub}

                    editSysDicPub={this.editSysDicPub}
                    selectedEntityIds={this.props.sysDicPubModel.selectedEntityIds}
                    onChangeSelectedRow={this.onChangeSelectedRow}

                >

                </SysDicPubList>

                {/* 
                <Modal
                    title="公共字典信息"
                    visible={this.props.sysDicPubModel.sysDicPubFormVisible}
                    destroyOnClose={true}
                    footer={false}
                    onCancel={this.closeSysDicPubForm}
                    maskClosable={false}
                    width={1000}
                >
                    <SysDicPubForm
                        entity={this.props.sysDicPubModel.entity}
                        onSave={this.saveSysDicPubForm}
                        onCancel={this.closeSysDicPubForm}
                    >
                    </SysDicPubForm>
                </Modal>
                */}


                <Drawer
                    title="公共字典信息"
                    placement="right"
                    width={350}
                    destroyOnClose={true}
                    onClose={this.closeSysDicPubForm}
                    visible={this.props.sysDicPubModel.sysDicPubFormVisible}
                >

                    <SysDicPubForm
                        entity={this.props.sysDicPubModel.entity}
                        onSave={this.saveSysDicPubForm}
                        onCancel={this.closeSysDicPubForm}
                    >
                    </SysDicPubForm>
                </Drawer>

                {/* <div>{stateStr}</div> */}
            </div>
        )
    }
}


export default connect(({ sysDicPubModel, loading }) => ({
    sysDicPubModel,
    loading
}))(SysDicPubRouter);