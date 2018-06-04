import React from 'react';

import {Input,Form,Icon} from 'antd';
const FormItem = Form.Item;



class PropertiesForm extends React.Component{
    constructor(props){
        super(props);
        this.formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        };


    }

    render(){

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const nameError = isFieldTouched('name') && getFieldError('name');
        const titleError =  isFieldTouched('title') && getFieldError('title');
        

       


        return(
            <Form  onSubmit={this.handleSubmit}>
               

                <FormItem
                    {...this.formItemLayout}
                    validateStatus={nameError ? 'error' : ''}
                    help={nameError || ''}
                    label="名称"
                >
                    {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入名称!' }],
                    })(
                        <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="名称" />
                    )}
                </FormItem>

                
                <FormItem
                        {...this.formItemLayout}
                        validateStatus={titleError ? 'error' : ''}
                        help={titleError || ''}
                        label="标题"
                    >
                    {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入标题' }],
                    })(
                        <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="标题" />
                    )}
                </FormItem>

                <FormItem
                        {...this.formItemLayout}
                        label="类型"
                    >
                    {getFieldDecorator('dataType')(
                        <Input prefix={<Icon type="eye-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="类型" disabled={true}/>
                    )}
                </FormItem>
              
            </Form>
        )
    }
}


const WrappedPropertiesForm = Form.create({
    mapPropsToFields(props) {  //FORM初始化值设置
        console.log('mapPropsToFields', props);
        const fieldsName = ['name','title'];

        //alert(props.formState.name)
        return {
            name: Form.createFormField({
                value: props.formState.name,
            }),
            title: Form.createFormField({
                value: props.formState.title,
            }),
            dataType: Form.createFormField({
                value: props.formState.dataType,
            })
        };

        /*let p = {};
        let {initValues} = props;
        if (initValues) {
        // 编辑时赋初值
        fieldsName.forEach(key => p[key] = {value: initValues[key]});
        } else {
        // 新建时赋空值
        fieldsName.forEach(key => p[key] = {value: ''});
        }
        return p;*/
  
    },
    onValuesChange(_, values) {//值改变事件
        console.log(_,values);
    },
    onFieldsChange(props, changedFields) {//值改变事件
        //console.log(props,changedFields);
        props.onChange(changedFields);
        
    }
  })(PropertiesForm);


export {WrappedPropertiesForm as PropertiesForm};