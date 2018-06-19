import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


class InitSetTableLayout extends React.Component{
    constructor(props){
        super(props);
        
    }



    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form  onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(InitSetTableLayout); 

export {
    WrappedNormalLoginForm as InitSetTableLayout
} ;