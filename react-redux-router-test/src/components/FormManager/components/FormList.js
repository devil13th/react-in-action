import React from 'react';
import {connect} from 'react-redux';
import {Table,Pagination } from 'antd';
import request from 'superagent';
import {createQueryFormListFn} from '../modules/fun';
class FormList extends React.Component{
    constructor(props){
        super(props);
        this.onSelectRow = this.onSelectRow.bind(this);
        /*this.state = {
            selectedRowKeys : []
        }*/
    }

    componentDidMount(){
        this.props.queryFormData();
    }

   

    

    onSelectRow = (selectedRowKeys,selectedRows) => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        //this.setState({ selectedRowKeys:selectedRowKeys });
        this.props.setSelectedFormId(selectedRowKeys[0]);
    }

    onRow = (record, index) => {
        return {
            onClick: () => {
                //this.setState({ selectedRowKeys:[record.id] });
                this.props.setSelectedFormId(record.id);
            },       // 点击行
            onMouseEnter: () => {},  // 鼠标移入行
        };
    }


    render(){
        const dataSource = [
            {"key":"1","id":"0","name":"name_0","title":"title_0","description":"description_0","author":"author_0","customTemplate":"customTemplate_0","updateDate":"updateDate_0","publishDate":"publishDate_0"},
            {"key":"2","id":"1","name":"name_1","title":"title_1","description":"description_1","author":"author_1","customTemplate":"customTemplate_1","updateDate":"updateDate_1","publishDate":"publishDate_1"},
            {"key":"3","id":"2","name":"name_2","title":"title_2","description":"description_2","author":"author_2","customTemplate":"customTemplate_2","updateDate":"updateDate_2","publishDate":"publishDate_2"},
            {"key":"4","id":"3","name":"name_3","title":"title_3","description":"description_3","author":"author_3","customTemplate":"customTemplate_3","updateDate":"updateDate_3","publishDate":"publishDate_3"},
            {"key":"5","id":"4","name":"name_4","title":"title_4","description":"description_4","author":"author_4","customTemplate":"customTemplate_4","updateDate":"updateDate_4","publishDate":"publishDate_4"},
            {"key":"6","id":"5","name":"name_5","title":"title_5","description":"description_5","author":"author_5","customTemplate":"customTemplate_5","updateDate":"updateDate_5","publishDate":"publishDate_5"},
            {"key":"7","id":"6","name":"name_6","title":"title_6","description":"description_6","author":"author_6","customTemplate":"customTemplate_6","updateDate":"updateDate_6","publishDate":"publishDate_6"},
            {"key":"8","id":"7","name":"name_7","title":"title_7","description":"description_7","author":"author_7","customTemplate":"customTemplate_7","updateDate":"updateDate_7","publishDate":"publishDate_7"},
            {"key":"9","id":"8","name":"name_8","title":"title_8","description":"description_8","author":"author_8","customTemplate":"customTemplate_8","updateDate":"updateDate_8","publishDate":"publishDate_8"},
            {"key":"10","id":"9","name":"name_9","title":"title_9","description":"description_9","author":"author_9","customTemplate":"customTemplate_9","updateDate":"updateDate_9","publishDate":"publishDate_9"}
        ]


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
            selectedRowKeys:[this.props.selectedFormId],
            type:'radio',
            onChange: this.onSelectRow,
        }

        const _this = this;

        const pagination = {
            defaultCurrent : 1,
            size:"big",
            current:this.props.formData.currentPage,
            pageSize:this.props.formData.pageSize,
            total:this.props.formData.total,
            showSizeChanger:true,
            showQuickJumper:true,
            showTotal: ()=>{ return "共" + _this.props.formData.total + "条记录"},
            onChange:(page, pageSize)=>{
               // alert(page + "|" + pageSize);
                _this.props.queryFormData(page,pageSize,_this.props.formDataType);
            },
            onShowSizeChange:(current, size)=>{
               // alert(current + "|" + size);
                _this.props.queryFormData(current, size,_this.props.formDataType);
            }
        }

        

        return (
            <div>
                {/*<Table size="small" loading={this.props.loading} onRow={this.onRow} rowSelection={rowSelection} rowKey="id" pagination={pagination} dataSource={dataSource} columns={columns} />*/}
                <Table loading={this.props.loading} onRow={this.onRow} rowSelection={rowSelection} rowKey="id" pagination={pagination} dataSource={this.props.formData.rows} columns={columns} />
                
            </div>
        )
    }
}


const mapStateToProps = (state,ownProps) => {
    const moduleState = state.formManagerReducer;
    return{
        /*loading: moduleState.formTableLoading,
        formData : moduleState.formData,
        selectedFormId : moduleState.selectedFormId,
       */
    }
}

const dispatchToProps = (dispatch,ownProps) => {
    return{
        setSelectedFormId : function(selectedFormId){
            dispatch({
                type:"SET_SELECTED_FORM_ID",
                selectedFormId
            })
        },
        queryFormData : function(currentPage=1,pageSize=10,condition="SYSTEM"){
            dispatch(
                createQueryFormListFn(dispatch,currentPage,pageSize,condition)
            );
        },

        setFormData : (data) =>{
            dispatch({
                type:"SET_FORM_DATA",
                data
            });
        }
    }
}
const FormListContainer = connect(mapStateToProps,dispatchToProps)(FormList);
export {FormListContainer as FormList}
