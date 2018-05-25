import React from 'react';
import { Table, Icon, Divider } from 'antd';


class  AntdTable extends React.Component{
    constructor(props){
        super(props);

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;">Action 一 {record.name}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
                <Divider type="vertical" />
                <a href="javascript:;" className="ant-dropdown-link">
                  More actions <Icon type="down" />
                </a>
              </span>
            ),
          }];
          
          const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          }];

        this.state = {
            columns:columns,
            data:data,
            selectedRowKeys:['1','2','3']
        }
        this.onChange = this.onChange.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
    }


    onChange(a,b){
      console.log(a,b);

      this.setState({
        selectedRowKeys : a
      })
    }

    onSelectAll(selected, selectedRows, changeRows){
      alert(1)
    }


    render(){
        return(
            <Table rowSelection={{onSelectAll:this.onSelectAll,onChange:this.onChange,selectedRowKeys:this.state.selectedRowKeys}} dataSource={this.state.data} columns={this.state.columns}  />
        )
    }
}


export {AntdTable} ;
