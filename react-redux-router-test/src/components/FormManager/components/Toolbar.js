import React from 'react';
import {connect} from 'react-redux';
import { Radio ,Divider ,Button,Popconfirm, message} from 'antd';
import request from 'superagent';
import {createQueryFormListFn} from '../modules/fun';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
class Toolbar extends React.Component{
    constructor(props){
        super(props);
        this.deleteForm = this.deleteForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.publishForm = this.publishForm.bind(this);
        this.state = {
            deleteButtonDisabled:false
        }
    }

    deleteForm(){
        const formId = this.props.selectedFormId;
        if(formId){
            this.props.deleteForm(formId,this.props.formData.currentPage,this.props.formData.pageSize,this.props.formDataType);
        }else{
            message.error('请选择表单');
        }
    }

    publishForm(){
        const formId = this.props.selectedFormId;
      
        if(formId){
            this.props.publishForm(formId,this.props.formData.currentPage,this.props.formData.pageSize,this.props.formDataType);
        }else{
            message.error('请选择表单');
        }
    }

    onChange(e){
        //console.log(e.target.value);
        this.props.setFormDataType(e.target.value);
        this.props.queryFormData(1,10,e.target.value);
    }

    render(){
        
        return (
            <div style={{background:'#fff'}}>
                <div style={{textAlign:'right'}}>
                    <RadioGroup size="small" value={this.props.formDataType} onChange={this.onChange}>
                        <RadioButton  value="SYSTEM">系统表单</RadioButton >
                        <RadioButton  value="CUSTOM">自定义表单</RadioButton >
                    </RadioGroup>

                    <Divider type="vertical" />  

                    <Button size="small" type="primary">新建表单</Button> &nbsp;
                    <Button size="small">编辑</Button> &nbsp; 
                    <Popconfirm placement="bottomRight" title="确定删除选择的表单吗?" onConfirm={this.deleteForm}  okText="是" cancelText="否">
                        <Button size="small" disabled={this.props.selectedFormId ? false : true}>删除</Button> &nbsp; 
                    </Popconfirm>
                    <Divider type="vertical" /> 

                    <Button size="small">导出</Button> &nbsp;
                    <Button size="small">导入</Button> &nbsp;

                    <Divider type="vertical" /> 

                    
                    <Popconfirm placement="bottomRight" title="确定发布选择的表单吗?" onConfirm={this.publishForm}  okText="是" cancelText="否">
                        <Button size="small" disabled={this.props.selectedFormId ? false : true}>发布</Button>
                    </Popconfirm> 
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state,ownProps) => {
    const moduleState = state.formManagerReducer;
    return{
        selectedFormId : moduleState.selectedFormId,
        formData : moduleState.formData
    }
}

const dispatchToProps = (dispatch,ownProps) => {
    return{
        publishForm : (formId,currentPage,pageSize,condition) => {
            //ajax 获取表单管理列表数据
            request
            .get(`/proxy/form/publishForm/${formId}`) //get方式请求 请求 // http://127.0.0.1:8888/sbt/form/deleteForm/[formId]
            .set('Content-Type', 'application/json') //设置Content-Type
            .set('Accept', 'application/json') //接受的类型
            .query({_r:Math.random()}) //发送的参数
            //.query({ action: 'edit', city: 'London' }) // query string
            //.use(prefix) // Prefixes *only* this request
            //.use(nocache) // Prevents caching of *only* this request
            .end((err, res) => {
                if (err) {
                    //console.log(err);
                    message.error('操作失败');
                } else {
                    //console.log(res);
                    console.log(res.body)
                    
                    if("SUCCESS" == res.body.status){
                        message.success('操作成功');

                        console.log("----------------");
                        console.log(ownProps);
                        
                        createQueryFormListFn(dispatch,currentPage,pageSize,condition)();

                       
                    }else{
                        message.error('操作失败:' + res.body.message);
                    }
                }
            });
        },
        deleteForm : (formId,currentPage,pageSize,condition) => {
            //ajax 获取表单管理列表数据
            request
            //.get(`/proxy/form/deleteForm/${formId}`) //get方式请求 请求 // http://127.0.0.1:8888/sbt/form/deleteForm/[formId]
            .get(`/proxy/api/form/deleteSystemVM?viewId=${formId}`)//http://127.0.0.1:8000/vh/api/form/deleteSystemVM?viewId=1
            .set('Content-Type', 'application/json') //设置Content-Type
            .set('Accept', 'application/json') //接受的类型
            .query({_r:Math.random()}) //发送的参数
            //.query({ action: 'edit', city: 'London' }) // query string
            //.use(prefix) // Prefixes *only* this request
            //.use(nocache) // Prevents caching of *only* this request
            .end((err, res) => {
                if (err) {
                    //console.log(err);
                    message.error('操作失败');
                } else {
                    //console.log(res);
                    console.log(res.body)
                    
                    if("SUCCESS" == res.body.status){
                        message.success('操作成功');

                        console.log("----------------");
                        console.log(ownProps);
                        
                        createQueryFormListFn(dispatch,currentPage,pageSize,condition)();

                        dispatch({
                            type:"CLEAR_SELECTED_FORM_ID"
                        })

                    }else{
                        message.error('操作失败:' + res.body.result);
                    }
                }
            });
        },
        queryFormData : (currentPage=1,pageSize=10,condition="SYSTEM") => {
            dispatch( 
                createQueryFormListFn(dispatch,currentPage,pageSize,condition)
            );
        },
        setFormDataType:(formDataType) => {
            dispatch({
                type:"SET_FORM_DATA_TYPE",
                formDataType
            }) 
        }
    }
}
const ToolbarContainer = connect(mapStateToProps,dispatchToProps)(Toolbar);
export {ToolbarContainer as Toolbar}
