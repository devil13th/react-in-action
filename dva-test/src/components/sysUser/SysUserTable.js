import React from 'react';
import {Table} from 'antd';

class SysUserTable extends React.Component{
    constructor(props){
        super(props);
        //从props对象中获取dispatch属性
        const {dispatch} = this.props;
        this.dispatch = dispatch;
    }

    onChange = (pagination, filters, sorter) => {
        //console.log(pagination);
        //console.log(filters);
        //console.log(sorter);
        this.props.onChange({
            current:pagination.current,
            pageSize:pagination.pageSize
        })
    }


    render(){
       
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };


        const columns = [
            {
            title: 'Name',
            dataIndex: 'userName',
            render: text => <a href="javascript:;">{text}</a>,
            sorter:true
            }, {
            title: 'Age',
            dataIndex: 'userSex',
            }, {
            title: 'Address',
            dataIndex: 'userTel',
            }
        ];
           


        return(
            <Table 
                rowKey="userId"
                size="small"
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={this.props.dataSource} 
                onChange={this.onChange}
                showHeader={true}
                pagination={{
                    current:this.props.current,
                    pageSize:this.props.pageSize,
                    showSizeChanger:true,
                    showQuickJumper:true,
                    pageSizeOptions:['10','20','30','40','50','60','100'],
                    total:this.props.total,
                    showTotal:function(total, range){ return "总条目数:" + total}
                }}
            />
        )
    }
}


/**
 * props:
 * data:数据
 */
export {SysUserTable as SysUserTable}