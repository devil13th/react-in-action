import React from 'react';
import { connect } from 'dva';
import {SysUserTable} from '../components/sysUser/SysUserTable'
import {Search} from '../components/sysUser/Search'
import {SysUserForm} from '../components/sysUser/SysUserForm';
import {UploadFile} from '../components/sysUser/UploadFile';
import { Tabs, Icon ,Button,Tooltip,Popconfirm} from 'antd';
import stl from '../styles/SysUser.css';
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class SysUserRouter extends React.Component{
    constructor(props){
        super(props);
        //从props对象中获取dispatch属性
        const {dispatch} = this.props;
        this.dispatch = dispatch;
        console.log(this.props.loading);
        
    }

    componentDidMount(){
        this.dispatch({
            type:"sysUser/getUserData",
            payload:{current:1,pageSize:10}
        });
    }

    queryAllData = (payload) => {
        /*this.dispatch({
            type:"sysUser/getUserData",
            payload
        });*/
        this.dispatch({
            type:"sysUser/setPageInfo",
            payload
        });
    }

    closeSysUserFormModal = () =>{
        this.dispatch({
            type:"sysUser/mergeState",
            payload:{
                SysUserFormModalVisible : false
            }
        });
    }

    closeUploadModal = () =>{
        this.dispatch({
            type:"sysUser/mergeState",
            payload:{
                uploadModalVisible : false
            }
        });
    }

    uploadImgs = (id) => {
        this.dispatch({
            type:"sysUser/mergeState",
            payload:{
                uploadModalVisible : true
            }
        });
    }

    openSysUserFormModal = () =>{
        this.dispatch({
            type:"sysUser/mergeState",
            payload:{
                SysUserFormModalVisible : true,
                sysUserInfo:{}
            }
        });
    }

    

    saveSysUserInfoTemp = (sysUserInfo) => {
        console.log(sysUserInfo)
        this.props.dispatch({
            type:"sysUser/saveUserInfo",
            payload:sysUserInfo
        })
    }

    onSearch = (queryCondition) => {
        this.props.dispatch({
            type:"sysUser/setQueryCondition",
            payload:{
                queryCondition
            }
        })
    }

    deleteUser = (id) => {
        this.props.dispatch({
            type:"sysUser/deleteUser",
            payload:id
        })
    }

    editUser = (id) => {
        this.props.dispatch({
            type:"sysUser/queryUser",
            payload:id
        })
        
    }

    

    updateSysUserInfo = (sysUserInfo) => {
        this.props.dispatch({
            type:"sysUser/updateUserInfo",
            payload:sysUserInfo
        })
    }


    searchOrg = (v) => {
        this.props.dispatch({
            type:"sysUser/querySysOrgData",
            payload:v
        })
    }
    


    render(){
        /** 
        根据 loading.effects 对象判断当前异步加载是否完成，并将该值传递给 Table 组件的 loading 属性，
        Table 组件会自己控制加载样式。dva-loading 在这里的作用只是提供异步加载的状态，
        具体加载样式由对应组件自己提供。
        */
       
        const queryLoading = this.props.loading.effects['sysUser/getUserData'] || this.props.loading.effects['sysUser/queryUser'];
        const saveLoading = this.props.loading.effects['sysUser/saveUserInfo'];
        const updateUserInfo = this.props.loading.effects['sysUser/updateUserInfo'];
        const editLoading = this.props.loading.effects['sysUser/queryUser'];

        const operations = [];
        operations.push(
            <Button key="xzBton" type="primary" icon="plus" onClick={this.openSysUserFormModal}>新增用户</Button>
        )
        return(
            <div className="content">

                <Tabs 
                    defaultActiveKey="1"
                    tabBarExtraContent={operations}
                >
                    <TabPane tab={<span ><Icon type="tag-o" />用户管理</span>} key="1">
                    </TabPane>
                </Tabs>

                <Search 
                    onSearch={this.onSearch}
                >
                </Search>

                <div className={stl.tabbleButtonToolDiv}>
                    <ButtonGroup size="small">
                        <Tooltip title="新增用户" placement="bottom">
                            <Button type="primary" icon="plus" onClick={this.openSysUserFormModal}></Button>
                        </Tooltip>
                        <Tooltip title="批量删除用户" placement="bottom">
                            <Popconfirm 
                                title="确定删除选中用户么 ?" 
                                placement="left"
                                okText="确定" 
                                cancelText="取消"
                            >
                                <Button icon="delete"></Button>
                            </Popconfirm>
                        </Tooltip>
                       
                    </ButtonGroup>
                </div>

                <SysUserTable
                    dataSource = {this.props.sysUser.dataSource} 
                    current = {this.props.sysUser.current}
                    pageSize = {this.props.sysUser.pageSize}
                    total = {this.props.sysUser.total}
                    deleteUser={this.deleteUser}
                    editUser={this.editUser}
                    onChange={this.queryAllData}
                    uploadImgs={this.uploadImgs}
                    loading={queryLoading}
                    editLoading={editLoading}

                >
                </SysUserTable>

                <SysUserForm
                    visible={this.props.sysUser.SysUserFormModalVisible}
                    onCloseModal={this.closeSysUserFormModal}
                    saveSysUserInfoTemp={this.saveSysUserInfoTemp}
                    saveLoading={saveLoading || updateUserInfo}
                    sysUserInfo={this.props.sysUser.sysUserInfo}
                    updateSysUserInfo={this.updateSysUserInfo}
                    searchOrg={this.searchOrg}
                    sysOrgData={this.props.sysUser.sysOrgData}
                >
                </SysUserForm>

                <UploadFile
                    visible={this.props.sysUser.uploadModalVisible}
                    onCloseModal={this.closeUploadModal}
                >

                </UploadFile>

            </div>


           
        )
    }
}


export default connect(({sysUser,loading }) => ({
    sysUser,
    loading 
  }))(SysUserRouter);