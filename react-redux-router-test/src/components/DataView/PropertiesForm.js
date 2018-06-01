import React from 'react';
import {Input,Form,Icon} from 'antd';
const FormItem = Form.Item;



class PropertiesForm extends React.Component{
    constructor(props){
        super(props);

        this.formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
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
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="名称" />
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
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="标题" />
                    )}
                </FormItem>

            </Form>
        )
    }
}


const WrappedPropertiesForm = Form.create()(PropertiesForm);


export {WrappedPropertiesForm as PropertiesForm};