import React from 'react';
import {Table,Button, Icon,Popconfirm,Tooltip} from 'antd';
import CFG from '../../../../constants';
class SysDicPubList extends React.Component{
    constructor(props){
        super(props);
    }

    //分页,排序,筛选改变时触发
    changePageAndSort = (pagination, filters, sorter) => {
        this.props.changePageAndSort(pagination, filters, sorter);
    }

    //tr斑马条纹样式
    rowClassNameRender = (record, index) => {
        if(index % 2 == 0){
            return "trEve";
        }else{
            return "trEve";
        }
    }

    render(){

        const columns = [
            /*{
                title: 'id',
                dataIndex: 'DIC_ID',
                key: 'DIC_ID',
                fixed: 'left',//表格横向滚动,固定在左侧的列
                width:150,
                render: text => <a href="javascript:;">{text}</a>,
                sorter:true
            }, */
            {
                title: 'Name',
                key: 'DIC_NAME',
                dataIndex: 'DIC_NAME',
                align:'left',
                sorter:true,
                width:'30%'
            },
            {
                title: 'Classify',
                key: 'DIC_CLASSIFY',
                dataIndex: 'DIC_CLASSIFY',
                align:'center',
                sorter:true,
                width:'20%'
            }, 
           
            {
                title: 'Description',
                key: 'DIC_DESC',
                dataIndex: 'DIC_DESC',
                align:'left',
                sorter:true,
                width:'50%'
            }
        ];
        return(
            <Table 
                rowKey="DIC_ID"
                size="small"
                columns={columns} 
                dataSource={this.props.listDataSource} 
                loading={this.props.loading}
                rowClassName={this.rowClassNameRender}
                pagination={{ ...this.props.pagination, showSizeChanger: true, pageSizeOptions: CFG.PAGESIZEOPTIONS }}
                onChange={this.changePageAndSort}
                bordered={false}
            />
        )
    }
}

export default SysDicPubList;