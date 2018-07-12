import React from 'react';
import {Table,Spin,Alert} from 'antd';


class SelectMainEntity extends React.Component{
    constructor(props){
        super(props);
        this.onRow = this.onRow.bind(this);
       
    }

    
    componentDidMount(){
        /*alert(1)
        var _this = this;
        
        //  http://127.0.0.1:8000/vh/api/form/queryAllVadpDomainModel
        //  /proxy/api/form/queryAllVadpDomainModel
        fetch('/proxy/api/form/queryAllVadpDomainModel', { // 在URL中写上传递的参数
            method: 'GET'
        })
        .then((res)=>{
            return res.text();
        })
        .then((res)=>{
            //console.log(res);
            //alert(res)
            var data = JSON.parse(res);
            _this.loadEntityListData(data);
        })*/
    }

    loadEntityListData = (data) => {
        
        this.setState({
            data 
        })
    }

    onRow = (record) => {
        var _this = this;
        return {
          onClick: () => {
            _this.props.onSelectedMainEntityKeys(record);
          }
        };
    }


    render(){
        const _this = this;
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        }];


        const rowSelection ={
            selectedRowKeys : this.props.selectedMainEntityKeys,
            type:"radio",
            onSelect: this.props.onSelectedMainEntityKeys
        }


        var entityTable   =  <Table 
                                dataSource={this.props.data} 
                                columns={columns} 
                                size="small"
                                pagination={false}
                                rowSelection={rowSelection}
                                onRow={this.onRow}
                                scroll={{ y: 350}}
                            >

                            </Table>;
        
        var loading = <Spin>
                            <Alert
                            description="正在加载数据,请稍后."
                            type="info"
                            />
                       </Spin>;


        return(
           (this.props.data && this.props.data.length > 0 ) ? entityTable : loading
        )
    }

}

export {SelectMainEntity as SelectMainEntity}