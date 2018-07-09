import React from 'react';
import { Spin, Alert ,Tabs, Button, Table, Icon, Divider } from 'antd';
const TabPane = Tabs.TabPane;


Date.prototype.format = function(fmt){ 
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}; 



class TaskSchedulingTaskManagerTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var _this = this;




        const columns = [{
            title: 'jobName',
            dataIndex: 'jobName',
            key: 'jobName'
        },{
            title: 'jobDesc',
            dataIndex: 'jobDesc',
            key: 'jobDesc',
        },{
            title: 'cronTabDesc',
            dataIndex: 'cronTabDesc',
            key: 'cronTabDesc',
        },{
            title: 'lastRunTime',
            dataIndex: 'lastRunTime',
            key: 'lastRunTime',
        },{
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        }];


        const taskDataPagination = {
            defaultCurrent : 1,
            defaultPageSize:10,
            size:"small",
            current:this.props.page.current,
            pageSize:this.props.page.pageSize,
            total:this.props.page.total,
            showSizeChanger:true, 
            showQuickJumper:true,
            showTotal: ()=>{ return "共" + _this.props.page.total + "条记录"}
          
        }

        return (
            <div>
                <Tabs>
                    <TabPane tab="任务管理" key="1">
                        <Table 
                            size="small"
                            columns={columns} 
                            dataSource={this.props.data} 
                            loading={this.props.loading}
                            pagination = {taskDataPagination}
                            onChange = {this.props.onPageSortChange}
                        >
                        </Table> 
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export {TaskSchedulingTaskManagerTable as TaskSchedulingTaskManagerTable}

