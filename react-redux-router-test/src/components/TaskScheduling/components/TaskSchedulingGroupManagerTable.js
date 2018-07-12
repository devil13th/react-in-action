import React from 'react';
import { Spin, Alert ,Tabs, Button, Table, Icon, Divider ,Tooltip,Popconfirm} from 'antd';
const TabPane = Tabs.TabPane;
class TaskSchedulingGroupManagerTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    

    render(){

        var _this = this;

        const columns = [{
            title: '组名称',
            dataIndex: 'groupName',
            key: 'groupName',
            width:'40%'
        }, {
            title: '组描述',
            dataIndex: 'groupDesc',
            key: 'groupDesc',
            width:'40%'
        }, {
            title: '管理',
            key: 'action',
            width:'20%',
            render: (text, record) => {
                const groupName = record.groupName;
                const _this = this;

                const operators = [];

                operators.push(
                    <Tooltip title="编辑" key={"edit_" + groupName}>
                        <Button size="small" icon="edit" onClick={function(){_this.props.editGroup(record.groupName,record.groupDesc,record.groupID)}}/>
                    </Tooltip>
                )

                operators.push(
                    <Tooltip title="删除" key={"sc" + groupName}>
                        <Popconfirm title="确定删除此任务吗?" onConfirm={function(){_this.props.deleteGroup(groupName)}}  okText="删除" cancelText="取消">
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
            },
        }];

        
        
        const groupDataPagination = {
            defaultCurrent : 1,
            defaultPageSize:10,
            size:"small",
            current:this.props.page.current,
            pageSize:this.props.page.pageSize,
            total:this.props.page.total,
            showSizeChanger:true, 
            showQuickJumper:true,
            showTotal: ()=>{ return "共" + _this.props.page.total + "条记录"}
            /*
            onChange:(page, pageSize)=>{
                alert("FormList onPageChange()")
               // alert(page + "|" + pageSize);
                _this.props.queryFormData(page,pageSize,_this.props.formDataType);
            },
            onShowSizeChange:(current, size)=>{
                alert("FormList onShowSizeChange()")
               // alert(current + "|" + size);
                _this.props.queryFormData(current, size,_this.props.formDataType);
            }*/
        }



        return(
            
            <div>
                <Tabs>
                    <TabPane tab="Job组管理" key="1">
                        <div style={{padding:5,textAlign:"right"}}>
                            <Tooltip title="新增组">
                                <Button type="primary" size="small" onClick={this.props.addGroup}>
                                    <Icon type="plus" />新增组
                                </Button>
                            </Tooltip>
                        </div>
                        <Table 
                            size="small"
                            columns={columns} 
                            dataSource={this.props.data} 
                            loading={this.props.loading}
                            pagination = {groupDataPagination}
                            onChange = {this.props.onPageSortChange}
                        >
                        </Table>                       
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export {TaskSchedulingGroupManagerTable as TaskSchedulingGroupManagerTable}