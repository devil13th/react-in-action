import React from 'react';
import {connect} from 'react-redux';
import {Table,Pagination,Button,Popconfirm,message } from 'antd';
import request from 'superagent';
import {createQueryFormListFn} from '../modules/fun';
class CustomFormList extends React.Component{
    constructor(props){
        super(props);
        this.onSelectRow = this.onSelectRow.bind(this);
        this.onRow = this.onRow.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
        this.state = {
            selectedRowKeys : []
        }
    }

    
    onSelectRow = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    onRow = (record, index) => {
        return {
            onClick: () => {
               this.onSelectRow(record.id)
            },       // 点击行
            onMouseEnter: () => {},  // 鼠标移入行
        };
    }

    deleteForm = () => {
        /*if(this.state.selectedRowKeys.length > 0){

        }else{
            message.error('请选择表单');
        }*/
        console.log(this.state.selectedRowKeys);
        this.props.deleteForm(this.state.selectedRowKeys);
    }

    render(){

        const columns = [{
            title: '表单ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '表单标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: '个性模板',
            dataIndex: 'customTemplate',
            key: 'customTemplate',
            align:'center',
            render: (text, record) => {
                
                if(text && "1"==text){
                    return <a href="#">有</a>
                }else{
                    return 
                }
                
               
            }
        }, {
            title: '修改时间',
            dataIndex: 'updateDate',
            key: 'updateDate',
        }, {
            title: '发布时间',
            dataIndex: 'publishDate',
            key: 'publishDate',
        }];

        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            type:'radio',
            onChange: this.onSelectRow,
        }

        const _this = this;

        
        const pagination = {
            defaultCurrent : 2,
            size:"big",
            current:this.props.currentPage ,
            showSizeChanger:true,
            showQuickJumper:true
            
        }
        

        return (
            <div>
                {/*<Table size="small" loading={this.props.loading} onRow={this.onRow} rowSelection={rowSelection} rowKey="id" pagination={pagination} dataSource={dataSource} columns={columns} />*/}
                
                <div style={{textAlign:'right',padding:16}}>
                    
                
                    
                    <Button size="small">编辑</Button> &nbsp; 
                    <Popconfirm placement="bottomRight" title="确定删除选择的表单吗?" onConfirm={this.deleteForm}  okText="是" cancelText="否">
                        <Button size="small" disabled={(this.state.selectedRowKeys.length > 0 &&  this.props.formData.rows.length > 0 )? false : true}>删除</Button> &nbsp; 
                    </Popconfirm>
                    
                </div>
               
                
                <Table size="small" loading={this.props.loading} onRow={this.onRow} rowSelection={rowSelection} rowKey="id" pagination={false} dataSource={this.props.formData.rows} columns={columns} />
                
            </div>
        )
    }
}
/*
const mapStateToProps = (state,ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {

    }
}

const CustomFormListContainer = connect(mapStateToProps,mapDispatchToProps)(CustomFormList);
export {CustomFormListContainer as CustomFormList}*/
export {CustomFormList as CustomFormList}
