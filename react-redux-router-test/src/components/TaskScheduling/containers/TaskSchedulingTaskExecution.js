import React from 'react';
import {connect} from 'react-redux';
import {TaskSchedulingTaskExecutionTable} from '../components/TaskSchedulingTaskExecutionTable';
class TaskSchedulingTaskExecution extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            executionData:[],
            executionDataLoading:true,
            executionDataPage : {
                current :1,
                pageSize:10
            }
        }
    }

    componentDidMount(){
        this.loadExecutionData(this.state.executionDataPage.current,this.state.executionDataPage.pageSize);
    }

    setExecutionDataPage = (pagination, filters, sorter) => {
        //console.log(pagination)
        this.loadExecutionData(pagination.current,pagination.pageSize)
    }

    loadExecutionData = (current,pageSize) => {
        const _this = this;
        const currentTemp = current;
        const pageSizeTemp = pageSize;
        fetch('http://127.0.0.1:8080/jobengine/getalljoblog', {
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
                item.key = item.logId;
                return item;
            })
            console.log(dataWapper)

            this.setState({
                executionData : dataWapper,
                executionDataLoading:false,
                executionDataPage:{
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
            <TaskSchedulingTaskExecutionTable
                loading={this.state.executionDataLoading}
                data = {this.state.executionData}
                onPageSortChange = {this.setExecutionDataPage}
                page = {this.state.executionDataPage}
            >
            </TaskSchedulingTaskExecutionTable>
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

const TaskSchedulingTaskExecutionContainer = connect(mapStateToProps,dispatchToProps)(TaskSchedulingTaskExecution);
export {TaskSchedulingTaskExecutionContainer as TaskSchedulingTaskExecution}

