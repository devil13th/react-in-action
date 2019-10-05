import React from 'react';
import { connect } from 'dva';
import { Modal, Tabs, Icon, Drawer, Button } from 'antd';
import ReactCodegenTestList from './view/ReactCodegenTestList';
import ReactCodegenTestSearch from './view/ReactCodegenTestSearch';
import ReactCodegenTestForm from './view/ReactCodegenTestForm';
import CFG from '../../../constants';

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class ReactCodegenTestRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           reactCodegenTestFormVisible: false
        }
    }

    componentDidMount() {
        //查询列表
        this.props.dispatch({
            type: "reactCodegenTestModel/queryList"
        });

        //查询字典分类下拉菜单数据
        this.props.dispatch({
            type: "reactCodegenTestModel/queryDicClassify"
        });
    }


    //分页,排序,筛选改变时触发
    changePageAndSort = (pagination, filters, sorter) => {
        this.props.dispatch({
            type: "reactCodegenTestModel/setPageAndSort",
            payload: {
                current: pagination.current,
                pageSize: pagination.pageSize,
                sortColumn: sorter.field,
                sortOrder: sorter.order
            }
        })
    }

    //打开编辑窗口
    openReactCodegenTestForm = () => {
        this.props.dispatch({
            type: "reactCodegenTestModel/mergeState",
            payload: {
                reactCodegenTestFormVisible: true,
                entity: {},
                operateType: CFG.OPERATETYPE.SAVE
            }
        })
    }

    //关闭编辑窗口
    closeReactCodegenTestForm = () => {
        this.props.dispatch({
            type: "reactCodegenTestModel/mergeState",
            payload: {
                reactCodegenTestFormVisible: false
            }
        })
    }

    //保存代码生成器测试
    saveReactCodegenTestForm = (obj) => {
        this.props.dispatch({
            type: "reactCodegenTestModel/saveReactCodegenTest",
            payload: obj
        })
    }

    //删除单条记录 - 代码生成器测试
    deleteReactCodegenTest = (id) => {
        this.props.dispatch({
            type: "reactCodegenTestModel/deleteReactCodegenTest",
            payload: id
        })
    }

    //删除多条记录 - 代码生成器测试
    deleteReactCodegenTestBatch = (id) => {
        this.props.dispatch({
            type: "reactCodegenTestModel/deleteReactCodegenTestBatch",
            payload: id
        })
    }



    //编辑代码生成器测试
    editReactCodegenTest = (id) => {
        this.props.dispatch({
            type: "reactCodegenTestModel/editReactCodegenTest",
            payload: id
        })
    }

    //查询代码生成器测试
    searchReactCodegenTest = (queryCondition) => {
        this.props.dispatch({
            type: "reactCodegenTestModel/setQueryCondition",
            payload: { ...queryCondition }
        })
    }
    //勾选/取消勾选列表
    onChangeSelectedRow = (selectedEntityIds) => {
        this.props.dispatch({
            type: "reactCodegenTestModel/mergeState",
            payload: {
                selectedEntityIds
            }
        })
    }



    render() {


        //dva组件state
        const state = this.props.reactCodegenTestModel;
        //组件state字符串
        var stateStr = JSON.stringify(state);

        const { current, pageSize, total } = this.props.reactCodegenTestModel.queryExtraBean;

        //列表查询loading
        const queryListLoading = this.props.loading.effects['reactCodegenTestModel/queryList']
        ||  this.props.loading.effects['reactCodegenTestModel/editReactCodegenTest']
        ||  this.props.loading.effects['reactCodegenTestModel/deleteReactCodegenTest']
        ||  this.props.loading.effects['reactCodegenTestModel/deleteReactCodegenTestBatch'];

        //保存实体loading
        const onSaveLoading = this.props.loading.effects['reactCodegenTestModel/saveReactCodegenTest'];
        return (
            <div className="mainContent">

                <ReactCodegenTestSearch
                    queryCondition={this.props.reactCodegenTestModel.queryConditionBean}
                    searchReactCodegenTest={this.searchReactCodegenTest}
                    openReactCodegenTestForm={this.openReactCodegenTestForm}
                    selectedEntityIds={this.props.reactCodegenTestModel.selectedEntityIds}
                    deleteReactCodegenTestBatch={this.deleteReactCodegenTestBatch}
                    dicClassifyDataSource={this.props.reactCodegenTestModel.dicClassifyDataSource}
                    queryListLoading={queryListLoading}
                >
                </ReactCodegenTestSearch>
                <ReactCodegenTestList
                    queryExtraBean={this.props.reactCodegenTestModel.queryExtraBean}
                    queryListLoading={queryListLoading}
                    changePageAndSort={this.changePageAndSort}
                    pagination={{
                        current, pageSize, total
                    }}
                    listDataSource={this.props.reactCodegenTestModel.listDataSource}
                    deleteReactCodegenTest={this.deleteReactCodegenTest}

                    editReactCodegenTest={this.editReactCodegenTest}
                    selectedEntityIds={this.props.reactCodegenTestModel.selectedEntityIds}
                    onChangeSelectedRow={this.onChangeSelectedRow}

                >

                </ReactCodegenTestList>

                {/* 
                <Modal
                    title="公共字典信息"
                    visible={this.props.reactCodegenTestModel.reactCodegenTestFormVisible}
                    destroyOnClose={true}
                    footer={false}
                    onCancel={this.closeReactCodegenTestForm}
                    maskClosable={false}
                    width={1000}
                >
                    <ReactCodegenTestForm
                        entity={this.props.reactCodegenTestModel.entity}
                        onSave={this.saveReactCodegenTestForm}
                        onCancel={this.closeReactCodegenTestForm}
                    >
                    </ReactCodegenTestForm>
                </Modal>
                */}


                <Drawer
                    title="公共字典信息"
                    placement="right"
                    width={450}
                    destroyOnClose={true}
                    onClose={this.closeReactCodegenTestForm}
                    visible={this.props.reactCodegenTestModel.reactCodegenTestFormVisible}
                >

                    <ReactCodegenTestForm
                        entity={this.props.reactCodegenTestModel.entity}
                        onSave={this.saveReactCodegenTestForm}
                        onCancel={this.closeReactCodegenTestForm}
                        onSaveLoading={onSaveLoading}
                    >
                    </ReactCodegenTestForm>
                </Drawer>

                {/* <div>{stateStr}</div> */}
            </div>
        )
    }
}


export default connect(({ reactCodegenTestModel, loading }) => ({
    reactCodegenTestModel,
    loading
}))(ReactCodegenTestRouter);