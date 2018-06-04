import React from 'react';
import { Row,Col,Form, Icon, Input, Button,message } from 'antd';
import {connect} from 'react-redux';
import style from  './style.css';
import {creatSaveViewBaseInfoFormAction} from './action';
import reducer from './reducer';

const FormItem = Form.Item;
const { TextArea } = Input;



function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class BaseInfo extends React.Component {
  constructor(props){
    super(props);
    this.saveFormData = this.saveFormData.bind(this);
    this.resetFormData = this.resetFormData.bind(this);
  }

  resetFormData(){
    this.props.form.resetFields();
  }
  saveFormData(e){
    
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        //console.log(this.props.form.getFieldsValue());
        this.props.saveFormData(this.props.form.getFieldsValue());
        message.warning('保存成功',1);
      }else{
        message.warning('请根据提示修改表单信息数据');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 12
      },
    };


    return (
      <div>



      <Form  layout="inline" onSubmit={this.handleSubmit} className="login-form" id="components-form-demo-normal-login">
        <FormItem {...formItemLayout} label="表单ID" className={style.w}>
            {getFieldDecorator('formId', {
            rules: [{ required: true, message: '请输入表单ID!' },{max:15,message: '请输入15个字符以内!'}],
            })(
            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="表单ID" />
            )}
        </FormItem>

        <FormItem {...formItemLayout}  label="菜单功能ID" className={style.w}>
            {getFieldDecorator('menuFunctionId', {
            rules: [{ required: true, message: '请输入菜单功能ID!' },{max:15,message: '请输入15个字符以内!'}],
            })(
            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="菜单功能ID" />
            )}
        </FormItem>

        <FormItem {...formItemLayout} label="表单名称" className={style.w}>
            {getFieldDecorator('formName', {
            rules: [{ required: true, message: '请输入表单名称!' },{max:15,message: '请输入15个字符以内!'}],
            })(
            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="表单名称" />
            )}
        </FormItem>

        <FormItem {...formItemLayout}  label="菜单标题" className={style.w}>
            {getFieldDecorator('menuTitle', {
            rules: [{ required: true, message: '请输入菜单标题!' },{max:15,message: '请输入15个字符以内!'}],
            })(
            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="菜单标题" />
            )}
        </FormItem>

        <FormItem {...formItemLayout} label="表单标题" className={style.w}>
            {getFieldDecorator('formTitle', {
            rules: [{ required: true, message: '请输入表单标题!' },{max:15,message: '请输入15个字符以内!'}],
            })(
            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="表单标题" />
            )}
        </FormItem>

        <FormItem {...formItemLayout}  label="上级菜单功能ID" className={style.w}>
            {getFieldDecorator('parentMenuFunctionId', {
            rules: [{ required: true, message: '请输入上级菜单功能ID!' },{max:15,message: '请输入15个字符以内!'}],
            })(
            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="上级菜单功能ID" />
            )}
        </FormItem>

        <FormItem {...formItemLayout}  label="描述" className={style.w}>
            {getFieldDecorator('description', {
            rules: [{max:200,message: '请输入200个字符以内!'}],
            })(
            <TextArea rows={4} prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="描述" />
            )}
        </FormItem>

        <FormItem {...formItemLayout} label="菜单描述" className={style.w}>
            {getFieldDecorator('menuDescription', {
            rules: [{max:200,message: '请输入200个字符以内!'}],
            })(
            <TextArea rows={4} prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="菜单描述" />
            )}
        </FormItem>
        
          
        
      </Form>


      <Row>
     


          <Col span={4} offset={9} style={{textAlign:"center"}} align="">
            <Button icon="save" size="small" onClick={this.saveFormData}>保存</Button>  
            &nbsp;
            <Button icon="sync" size="small" onClick={this.resetFormData}>重置</Button>
          </Col>

        </Row>





        {/*
        <Row>
          <Col span={3} offset={4} style={{textAlign:"left",lineHeight:"30px"}}>表单ID</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="表单ID" /></Col>
          
          <Col span={3} offset={2} style={{textAlign:"left",lineHeight:"30px"}}>菜单功能ID</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="菜单功能ID" /></Col>
        </Row>
        <Row>
          <Col span={3} offset={4} style={{textAlign:"left",lineHeight:"30px"}}>表单名称</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="表单名称" /></Col>
          
          <Col span={3} offset={2} style={{textAlign:"left",lineHeight:"30px"}}>菜单标题</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="菜单标题" /></Col>
        </Row>
        <Row>
          <Col span={3} offset={4} style={{textAlign:"left",lineHeight:"30px"}}>表单标题</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="表单标题" /></Col>
          
          <Col span={3} offset={2} style={{textAlign:"left",lineHeight:"30px"}}>上级菜单功能ID</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="上级菜单功能ID" /></Col>
        </Row>
        <Row>
          <Col span={3} offset={4} style={{textAlign:"left",lineHeight:"30px"}}>描述</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><TextArea rows={4} /></Col>
          
          <Col span={3} offset={2} style={{textAlign:"left",lineHeight:"30px"}}>菜单描述</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><TextArea rows={4} /></Col>
        </Row>
            
          */}
       
      </div>
    );
  }
}


const WrappedHorizontalLoginForm = Form.create({
  onValuesChange : function(props, changedValues, allValues){
    //console.log(props);
    
  }

})(BaseInfo);

const mapStateToProps = function(state,ownProps){
  return {
    formData : state.formData
  }
}
const mapDispatchToProps = function(dispatch,ownProps){
  return{
    saveFormData:(formData)=>{
      dispatch(creatSaveViewBaseInfoFormAction(formData));
    }
  }
}






const BaseInfoWrapForm = connect(mapStateToProps,mapDispatchToProps)(WrappedHorizontalLoginForm);

export{ BaseInfoWrapForm as BaseInfo};