import React from 'react';
import {connect} from 'react-redux';
import {TaskSchedulingTaskManagerTable} from '../components/TaskSchedulingTaskManagerTable';
class TaskSchedulingTaskManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskData:[],
            taskDataLoading:true,
            taskDataPage : {
                current :1,
                pageSize:10
            }
        }
    }

    componentDidMount(){
        this.loadTaskData(this.state.taskDataPage.current,this.state.taskDataPage.pageSize);
    }

    setTaskDataPage = (pagination, filters, sorter) => {
        //console.log(pagination)
        this.loadTaskData(pagination.current,pagination.pageSize)
    }

    loadTaskData = (current,pageSize) => {
        
        const _this = this;
        const currentTemp = current;
        const pageSizeTemp = pageSize;
        fetch('http://127.0.0.1:8080/jobengine/getalljob', {
            method: 'post',// 指定是POST请求
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
                >
                </TaskSchedulingTaskManagerTable>
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

