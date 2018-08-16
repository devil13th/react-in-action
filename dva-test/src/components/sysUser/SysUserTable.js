import React from 'react';
import {Table,Button, Icon,Popconfirm,Tooltip} from 'antd';

const ButtonGroup = Button.Group;

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
        
        const _this = this;
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
                key: 'name',
                fixed: 'left',//表格横向滚动,固定在左侧的列
                width:150,
                render: text => <a href="javascript:;">{text}</a>,
                sorter:true
            }, 
            {
                title: 'Sex',
                key: 'sex',
                dataIndex: 'userSex',
                align:'center',
                render:function(text, record, index) {
                    if(text=='1'){
                        return "男"
                    }else{
                        return "女"
                    }
                }
            }, 
            {
                title: 'Tel',
                key: 'tel',
                dataIndex: 'userTel',
                align:'center'
            },
            {
                title: 'Birthday',
                key: 'birthday',
                dataIndex: 'userBirthday',
                align:'center'
            },
            {
                title: 'Email',
                key: 'email',
                dataIndex: 'userMail',
                align:'center'
            },
            {
                title: 'Org',
                key: 'orgName',
                dataIndex: 'orgName',
                align:'center'
            },
            {
                title: 'Operate',
                key: 'operate',
                align:'center',
                width:150,
                fixed: 'right',//表格横向滚动,固定在右侧的列
                render:function(text, record, index) {
                    return (
                        <ButtonGroup size="small">
                            
                            
                            
                            <Tooltip placement="bottom" title="编辑">
                                <Button icon="edit" type="primary" onClick={function(){_this.props.editUser(record.userId)}}></Button>
                            </Tooltip>

                            <Tooltip placement="bottom" title="上传头像">
                                <Button icon="upload" onClick={function(){_this.props.uploadImgs(record.userId)}}></Button>
                            </Tooltip>

                            <Popconfirm placement="top" title="确定删除吗?" onConfirm={function(){_this.props.deleteUser(record.userId)}} okText="Yes" cancelText="No">
                                <Tooltip placement="bottom" title="删除">
                                    <Button icon="delete"></Button>
                                </Tooltip>
                            </Popconfirm>

                            
                        </ButtonGroup>
                    )
                }
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
                loading={this.props.loading}
                scroll={{x:1200}}
                pagination={{
                    current:this.props.current,
                    pageSize:this.props.pageSize,
                    showSizeChanger:true,
                    showQuickJumper:true,
                    pageSizeOptions:['10','20','30','40','50','60','100'],
                    total:this.props.total,
                    showTotal:function(total, range){ return "总条目数:" + total}
                }}
                bordered={true}
            />
        )
    }
}


/**
 * props:
 * data:数据
 */
export {SysUserTable as SysUserTable}