import React from 'react';
import {connect} from 'react-redux';
import {TaskSchedulingTaskManagerTable} from '../components/TaskSchedulingTaskManagerTable';
import {TaskSchedulingTaskManagerForm} from '../components/TaskSchedulingTaskManagerForm';
import {TaskSchedulingTaskManagerSearch} from '../components/TaskSchedulingTaskManagerSearch';
import {message,Modal} from 'antd';
import {serverCfg} from '../modules/ServerCfg';
class TaskSchedulingTaskManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskData:[],
            taskDataLoading:true,
            taskDataPage : {
                current :1,
                pageSize:10
            },
            //新增任务模态窗口
            addTaskModalVisible:false,
            //任务信息-用于编辑任务
            taskInfo:{}
        }
       
    }

    componentDidMount(){
        this.loadTaskData(this.state.taskDataPage.current,this.state.taskDataPage.pageSize);
    }

    setTaskDataPage = (pagination, filters, sorter) => {
        //console.log(pagination)
        this.loadTaskData(pagination.current,pagination.pageSize)
    }
    //关闭添加任务模态窗口
    cancelAddTaskModal = () => {
        this.setState({
            addTaskModalVisible:false
        })
    }
    //打开添加任务模态窗口
    addTask = () => {
        this.setState({
            taskInfo:{jobName:""},
            addTaskModalVisible:true
        })
    }

    //开始任务
    startTask = (jobName) => {
        this.operateTask(jobName,"startjob");
    }

    //停止任务
    stopTask = (jobName) => {
        this.operateTask(jobName,"stopjob");
    }

    //执行任务
    runTask = (jobName) => {
        this.operateTask(jobName,"runjob");
    }

    
    //开始/结束/执行 任务公共请求  state:startjob/stopjob/runTask
    operateTask = (jobName,state) => {
       
        fetch(`${serverCfg.getServerAddr()}jobengine/${state}/${jobName}?_r=${Math.random()}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            return res.text();
        })
        .then((res)=>{
           
            if(res == "true"){
                message.info('操作成功');
                this.queryTaskData();
            }else{
                const data = JSON.parse(res);
                message.error(data.message);
            }
            
        })


    }


    delTask = (jobName) => {

        
        fetch(`${serverCfg.getServerAddr()}jobengine/deljob`, {
            method: 'POST',// 指定是POST请求
            headers:{
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type':'application/json'
            },
            body:"[\"" + jobName + "\"]"// 这里是请求参数
        })
        .then((res)=>{
            return res.text();
        })
        .then((res)=>{
           
            if(res == "true"){
                message.info('操作成功');
                this.queryTaskData();
            }else{
                const data = JSON.parse(res);
                message.error(data.message);
            }
            
        })

    }




    //编辑任务
    editTask = (jobName) =>{
        //alert(jobName);

        
        fetch(`${serverCfg.getServerAddr()}jobengine/getjobinfo/${jobName}?_r=${Math.random()}`, {
            method: 'GET',// 指定是POST请求
            headers:{
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            return res.text();
        })
        .then((res)=>{
           
            const data = JSON.parse(res);
            //console.log(data.entity);
            if(data.success){
                this.setState({
                    taskInfo : data.entity,
                    addTaskModalVisible : true
                })
            }else{
                message.error('加载失败');
            }
            
               
        })
    }


    //添加任务
    okAddTaskModal = () => {
        this.cancelAddTaskModal();
    }
    //保存任务
    saveTask = (formData,o) => {
        var _this = this;
        let operate = "";
        //有jobId则为编辑否则为新增
        if(formData.jobID){
            operate = "updatejob"
        }else{
            operate = "addjob"
        };
        //alert(operate)

        fetch(`${serverCfg.getServerAddr()}jobengine/${operate}`, {
            method: 'POST',// 指定是POST请求
            headers:{
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)// 这里是请求参数
        })
        .then((res)=>{
            //console.log("-----------------");
            if(res.status==200){
                message.success('保存成功');
                _this.cancelAddTaskModal();

                const {current,pageSize} = this.state.taskDataPage;
                //alert(current + "|" + pageSize);
                _this.loadTaskData(current,pageSize);


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
                    _this.cancelAddTaskModal();

                    
                    const {current,pageSize} = this.state.taskDataPage
                    //alert(current + "|" + pageSize);
                    _this.loadTaskData(current,pageSize)


                }else if(data.status == 500){
                    message.error(data.message);
                }else{
                    message.error('保存失败');
                }
            }
        })
    }

    



    queryTaskData = (condition) => {
        this.loadTaskData(this.state.taskDataPage.current,this.state.taskDataPage.pageSize,condition);
    }

    loadTaskData = (current,pageSize,condition) => {
        //alert("loadTaskData")
        const _this = this;
        const currentTemp = current;
        const pageSizeTemp = pageSize;

        let queryConditionAndPageSort = {
            filters:[],
            pageNo:current,
            pageSize:pageSize
        }
        if(condition){
            queryConditionAndPageSort = {...queryConditionAndPageSort,...condition}
        }

        this.setState({
            taskDataLoading:true
        })

        

        fetch(serverCfg.getServerAddr() + 'jobengine/getalljob', {
            method: 'POST',// 指定是POST请求
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(queryConditionAndPageSort)// 这里是请求参数
        })
        .then((res)=>{
            return res.text()
        })
        .then((res)=>{
            const data = JSON.parse(res);
            var dataWapper =  data.entity.map((item,index) => {
                item.key = item.jobID;
                return item;
            })
            

            this.setState({
                taskData : dataWapper,
                taskDataLoading:false,
                taskDataPage:{
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
                <TaskSchedulingTaskManagerSearch
                    onSearch={this.queryTaskData}
                >
                </TaskSchedulingTaskManagerSearch>
                <TaskSchedulingTaskManagerTable
                    loading={this.state.taskDataLoading}
                    data = {this.state.taskData}
                    onPageSortChange = {this.setTaskDataPage}
                    page = {this.state.taskDataPage}
                    addTask = {this.addTask}
                    editTask={this.editTask}
                    startTask={this.startTask}
                    stopTask={this.stopTask}
                    runTask={this.runTask}
                    delTask={this.delTask}
                >
                </TaskSchedulingTaskManagerTable>


                <Modal
                    title="任务信息"
                    visible={this.state.addTaskModalVisible}
                    onOk={this.okAddTaskModal}
                    onCancel={this.cancelAddTaskModal}
                    maskClosable={false}
                    width="50%"
                    footer={null}

                >
                    <TaskSchedulingTaskManagerForm
                        onFormSubmit = {this.saveTask}
                        closeAddTaskModal = {this.cancelAddTaskModal}
                        taskInfo={this.state.taskInfo}
                    >
                    </TaskSchedulingTaskManagerForm>
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

const TaskSchedulingTaskManagerContainer = connect(mapStateToProps,dispatchToProps)(TaskSchedulingTaskManager);
export {TaskSchedulingTaskManagerContainer as TaskSchedulingTaskManager}

