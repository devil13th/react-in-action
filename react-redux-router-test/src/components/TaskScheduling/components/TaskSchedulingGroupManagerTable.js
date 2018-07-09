import React from 'react';
import { Spin, Alert ,Tabs, Button, Table, Icon, Divider } from 'antd';
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
            key: 'groupName'
        }, {
            title: '组描述',
            dataIndex: 'groupDesc',
            key: 'groupDesc',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;">Action</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
                <Divider type="vertical" />
                <a href="javascript:;" className="ant-dropdown-link">
                  More actions <Icon type="down" />
                </a>
              </span>
            ),
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