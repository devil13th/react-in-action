import React from 'react';
import { ButtonGroup,Tooltip,Spin, Alert ,Tabs, Button, Table, Icon, Divider,Popconfirm } from 'antd';
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
            title: 'job名称',
            dataIndex: 'jobName',
            key: 'jobName',
            width:'25%'
        },{
            title: '定时表达式',
            dataIndex: 'cronTabDesc',
            key: 'cronTabDesc',
            width:'15%'
        },{
            title: '上次执行时间',
            dataIndex: 'lastRunTime',
            key: 'lastRunTime',
            width:'20%',
            align:'center',
            render : function(text, record){
                let d = new Date(text);
                return <span>{d.format("yyyy-MM-dd hh:mm:ss")}</span>
            }
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width:'10%',
            align:'center',
            render: (text, record) => {
                if(text == -1){
                    return <span>未启动</span>
                }
                if(text == 0){
                    return <span>已启动</span>
                }
            }
        },{
            title: '管理',
            dataIndex: 'action',
            width:'25%',
            align:'center',
            render: (text, record) => {
                const jobName = record.jobName;
                const _this = this;

                const operators = [];

                operators.push(
                    <Tooltip mouseLeaveDelay={0} title="编辑" key={"edit_" + record.jobName}>
                        <Button   size="small" icon="edit" onClick={function(){_this.props.editTask(jobName)}}/>
                    </Tooltip>
                )

                
                operators.push(
                    <Tooltip mouseLeaveDelay={0}  title="预警设置" key={"yjsz" + record.jobName}>
                        <Button size="small" icon="bell"/>
                    </Tooltip>
                )

                if(record.status == -1){
                    operators.push(
                        <Tooltip mouseLeaveDelay={0}  title="启动" key={"qd" + record.jobName}>
                            <Popconfirm title="确定启动此任务吗?" onConfirm={function(){_this.props.startTask(jobName)}}  okText="启动" cancelText="取消">
                                <Button size="small"  icon="play-circle-o"/>
                            </Popconfirm>
                        </Tooltip>
                    )
                }else{
                    operators.push(
                        <Tooltip mouseLeaveDelay={0}  title="停止" key={"tz" + record.jobName}>
                            <Popconfirm title="确定启动此任务吗?" onConfirm={function(){_this.props.stopTask(jobName)}}  okText="停止" cancelText="取消">
                                <Button size="small" icon="pause-circle-o" />
                            </Popconfirm>
                        </Tooltip>
                    )
                }
                operators.push(
                    <Tooltip mouseLeaveDelay={0}  title="立即执行" key={"ljzx" + record.jobName}>
                        <Popconfirm title="确定启动此任务吗?" onConfirm={function(){_this.props.runTask(jobName)}}  okText="执行" cancelText="取消">
                            <Button size="small" icon="caret-right" />
                        </Popconfirm>
                    </Tooltip>
                )
                operators.push(
                    <Tooltip mouseLeaveDelay={0}  title="执行记录" key={"zxjl" + record.jobName}>
                        <Button size="small" icon="menu-unfold" onClick={function(){_this.startTask(jobName)}}/>
                    </Tooltip>
                )
                operators.push(
                    <Tooltip mouseLeaveDelay={0}  title="删除" key={"sc" + record.jobName}>
                    <Popconfirm title="确定删除此任务吗?" onConfirm={function(){_this.props.delTask(jobName)}}  okText="删除" cancelText="取消">
                        <Button  size="small" icon="delete" />
                    </Popconfirm>
                    </Tooltip>
                )
                return(
                    <span>
                    <Button.Group size="small">
                        {
                            operators.map(function(item){
                                return item;
                            })
                        }
                    </Button.Group>
                        
                        
                    </span>
                )
            }
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
                        <div style={{padding:5,textAlign:"right"}}>
                            <Tooltip title="新增任务">
                                <Button type="primary" size="small" onClick={this.props.addTask}>
                                    <Icon type="plus" />新增任务
                                </Button>
                            </Tooltip>
                        </div>
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

