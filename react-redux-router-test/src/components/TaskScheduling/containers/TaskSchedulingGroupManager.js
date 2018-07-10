import React from 'react';
import {connect} from 'react-redux';
import {TaskSchedulingGroupManagerTable} from '../components/TaskSchedulingGroupManagerTable';
class TaskSchedulingGroupManager extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            groupData:[],
            groupDataLoading:true,
            groupDataPage : {
                current :1,
                pageSize:10
            }
        }
    }

    componentDidMount(){
        this.loadGroupData(this.state.groupDataPage.current,this.state.groupDataPage.pageSize);
    }

    setGroupDataPage = (pagination, filters, sorter) => {
        //console.log(pagination)
        this.loadGroupData(pagination.current,pagination.pageSize)
    }

    loadGroupData = (current,pageSize) => {
        const _this = this;
        const currentTemp = current;
        const pageSizeTemp = pageSize
        fetch('http://127.0.0.1:8080/jobengine/getallgroup', {
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
            console.log(dataWapper)


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
                >
                </TaskSchedulingGroupManagerTable>
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

