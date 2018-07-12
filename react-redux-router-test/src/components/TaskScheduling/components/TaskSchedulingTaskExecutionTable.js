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
    



class TaskSchedulingTaskExecutionTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var _this = this;
        const columns = [{
            title: 'job名称',
            dataIndex: 'jobName',
            key: 'jobName'
        }, {
            title: '定时表达式',
            dataIndex: 'cronTabDesc',
            key: 'cronTabDesc',
            align:'center'
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align:'center',
            render : function(text, record){
                let showText = "";
                if(text === 0){
                    showText = '已完成'
                }else if(val === 1){
                    showText = '执行中'
                }else{
                    showText = '未知';
                }


                return (
                    <span>
                        {showText}
                    </span>
                )
            }
        }, {
            title: '上次执行时间',
            dataIndex: 'begin_time',
            key: 'begin_time',
            align:'center',
            render : function(text, record){
                let d = new Date(text);
                return <span>{d.format("yyyy-MM-dd hh:mm:ss")}</span>
            }
        }, {
            title: '上次执行时长(ms)',
            dataIndex: 'durationTime',
            key: 'durationTime',
            align:'center'
        }, {
            title: '是否抛出例外',
            dataIndex: 'errorFlag',
            key: 'errorFlag',
            align:'center',
            render : function(text, record){
                let showText = "";
                if(text === 0){
                    showText = '否'
                }else{
                    showText = '是'
                }
                return (
                    <span>
                        {showText}
                    </span>
                )
            }
        }, {
            title: '例外描述',
            dataIndex: 'errorMsg',
            key: 'errorMsg',
        }];


        const executionDataPagination = {
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
                    <TabPane tab="Job执行记录" key="1">
                        <Table 
                            size="small"
                            columns={columns} 
                            dataSource={this.props.data} 
                            loading={this.props.loading}
                            pagination = {executionDataPagination}
                            onChange = {this.props.onPageSortChange}
                        >
                        </Table> 
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export {TaskSchedulingTaskExecutionTable as TaskSchedulingTaskExecutionTable}

