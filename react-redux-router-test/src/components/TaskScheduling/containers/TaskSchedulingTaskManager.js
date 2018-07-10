import React from 'react';
import {connect} from 'react-redux';
import {TaskSchedulingTaskManagerTable} from '../components/TaskSchedulingTaskManagerTable';
import {TaskSchedulingTaskManagerForm} from '../components/TaskSchedulingTaskManagerForm';
import {message,Modal} from 'antd';
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

    //编辑任务
    editTask = (jobName) =>{
        //alert(jobName);
        fetch(`http://127.0.0.1:8080/jobengine/getjobinfo/${jobName}?_r=${Math.random()}`, {
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

        fetch(`http://127.0.0.1:8080/jobengine/${operate}`, {
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

    

    loadTaskData = (current,pageSize) => {
        //alert("loadTaskData")
        const _this = this;
        const currentTemp = current;
        const pageSizeTemp = pageSize;
        fetch('http://127.0.0.1:8080/jobengine/getalljob', {
            method: 'POST',// 指定是POST请求
            headers:{
                'Accept': 'application/json',
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
                <TaskSchedulingTaskManagerTable
                    loading={this.state.taskDataLoading}
                    data = {this.state.taskData}
                    onPageSortChange = {this.setTaskDataPage}
                    page = {this.state.taskDataPage}
                    addTask = {this.addTask}
                    editTask={this.editTask}
                >
                </TaskSchedulingTaskManagerTable>


                <Modal
                    title="新增任务"
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

