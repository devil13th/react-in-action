import React from 'react';
import {connect} from 'react-redux';
import {TaskSchedulingGroupManagerTable} from '../components/TaskSchedulingGroupManagerTable';
import {TaskSchedulingGroupManagerForm} from '../components/TaskSchedulingGroupManagerForm';
import {message,Modal} from 'antd';
import {serverCfg} from '../modules/ServerCfg';
class TaskSchedulingGroupManager extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            groupData:[],
            groupDataLoading:true,
            groupDataPage : {
                current :1,
                pageSize:10
            },
            //任务组模态窗口状态
            groupModalVisible:false,
            //任务组信息
            groupInfo:{},
        }
    }

    componentDidMount(){
        this.loadGroupData(this.state.groupDataPage.current,this.state.groupDataPage.pageSize);
    }

    

    //编辑组信息
    editGroup = (groupName,groupDesc,groupID) => {
        //alert(groupName);
        console.log(groupName,groupDesc,groupID)
        this.setState({
            groupInfo:{
                groupID,
                groupName,
                groupDesc
            },
            groupModalVisible : true
        })
    }
    //添加组信息
    addGroup = () => {
        this.setState({
            groupInfo:{
                groupID:"",
                groupName:"",
                groupDesc:""
            },
            groupModalVisible : true
        })
    }
    //打开组信息模态窗口
    openGroupModal = () => {
        this.setState({
            groupModalVisible : true
        })
    }
    //关闭组信息模态窗口
    closeGroupModal = () => {
        this.setState({
            groupModalVisible : false
        })
    }


    //保存组信息   addgroup:新增  updategroup:修改
    saveGroup = (groupObj,o) => {
        //http://192.168.248.92:8430/jobengine/addgroup
        //addgroup:新增  updategroup:修改
        

        const _this = this;
        console.log(groupObj)
        const operator = groupObj.groupID ? "updategroup" : "addgroup";
        fetch(`${serverCfg.getServerAddr()}jobengine/${operator}`, {
            method: 'POST',// 指定是POST请求
            headers:{
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(groupObj)// 这里是请求参数
        })
        .then((res)=>{
            //console.log("-----------------");
            if(res.status==200){
                message.success('保存成功');
                _this.closeGroupModal();

                const {current,pageSize} = this.state.groupDataPage;
                //alert(current + "|" + pageSize);
                _this.loadGroupData(current,pageSize);


                //以下代码解决antd表单initialValue不刷新的bug!
                if(o){
                    o.props.form.resetFields();
                }

            }else{
                return res.text();
            }
        })
        .then((res)=>{
            if(res){
                const data = JSON.parse(res);
                //alert(data.status)
                //console.log(data);
                if(data.status == 200){
                    message.success('保存成功');
                    _this.closeGroupModal();

                    
                    const {current,pageSize} = this.state.groupDataPage
                    //alert(current + "|" + pageSize);
                    _this.loadGroupData(current,pageSize);


                }else if(data.status == 500){
                    message.error(data.message);
                }else{
                    message.error('保存失败');
                }
            }
        })
    }

    deleteGroup = (groupName) => {
        this.operateGroup(groupName,"delgroup");
    }


    //fetch 任务公共请求  state:delgroup
    operateGroup = (groupName,state) => {
        const _this = this;
        fetch(`${serverCfg.getServerAddr()}jobengine/${state}`, {
            method: 'POST',// 指定是POST请求
            headers:{
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type':'application/json'
            },
            body:"[\"" + groupName + "\"]"// 这里是请求参数
        })
        .then((res)=>{
            return res.text();
        })
        .then((res)=>{
           
            if(res == "true"){
                message.info('操作成功');
                const {current,pageSize} = this.state.groupDataPage;
                //alert(current + "|" + pageSize);
                _this.loadGroupData(current,pageSize);
            }else{
                const data = JSON.parse(res);
                message.error(data.message);
            }
            
        })


    }

    setGroupDataPage = (pagination, filters, sorter) => {
        //console.log(pagination)
        this.loadGroupData(pagination.current,pagination.pageSize)
    }

    loadGroupData = (current,pageSize) => {
        const _this = this;
        const currentTemp = current;
        const pageSizeTemp = pageSize
        fetch(`${serverCfg.getServerAddr()}jobengine/getallgroup`, {
            method: 'POST',// 指定是POST请求
            headers:{
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                filters:[],
                pageNo:current,
                pageSize:pageSize,
              })// 这里是请求参数
        })
        .then((res)=>{            
            return res.text()
        })
        .then((res)=>{
            const data = JSON.parse(res);
            
            var dataWapper =  data.entity.map((item,index) => {
                item.key = item.groupID;
                return item;
            })
            //console.log(dataWapper)

            this.setState({
                groupData : dataWapper,
                groupDataLoading:false,
                groupDataPage:{
                    total : data.total,
                    current :currentTemp,
                    pageSize:pageSizeTemp
                }
            })
            //console.log(res)
        })
    }


    render(){
        
        return (
            <div>
                <TaskSchedulingGroupManagerTable
                    loading={this.state.groupDataLoading}
                    data = {this.state.groupData}
                    onPageSortChange = {this.setGroupDataPage}
                    page = {this.state.groupDataPage}
                    editGroup = {this.editGroup}
                    addGroup = {this.addGroup}
                    deleteGroup = {this.deleteGroup}
                >
                </TaskSchedulingGroupManagerTable>

                <Modal
                    title="任务组信息"
                    visible={this.state.groupModalVisible}
                    maskClosable={false}
                    width="50%"
                    footer={null}
                    onCancel={this.closeGroupModal}
                    
                >
                    <TaskSchedulingGroupManagerForm
                        closeGroupModal={this.closeGroupModal}
                        groupInfo = {this.state.groupInfo}
                        onFormSubmit = {this.saveGroup}
                    >
                    </TaskSchedulingGroupManagerForm>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = (state,ownProps) => {
    return{
      
    }
}

const dispatchToProps = (dispatch,ownProps) => {
    return{

    }
}

const TaskSchedulingGroupManagerContainer = connect(mapStateToProps,dispatchToProps)(TaskSchedulingGroupManager);
export {TaskSchedulingGroupManagerContainer as TaskSchedulingGroupManager}

