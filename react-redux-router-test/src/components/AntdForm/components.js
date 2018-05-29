import React from 'react';
import { Row,Col,Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.css';
const FormItem = Form.Item;


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
  

class AntdForm extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });

        console.log(this.props.form.getFieldValue("userName"))
        this.props.form.setFieldsValue({userName:"5678"})
        this.props.form.setFieldsValue({password:"90JQ"})
      }
    render() {
        const { getFieldDecorator } = this.props.form;


        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };



        return (
           
            <Row>
                <Col span={10} offset={7} >
                    <Form  layout="Vertical" onSubmit={this.handleSubmit} className="login-form" id="components-form-demo-normal-login">
                        <FormItem {...formItemLayout} label="userName">
                            {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout}  label="password">
                            {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>

                        <FormItem wrapperCol={{
                            xs: { span: 24 },
                            sm: { span: 24 },
                        }}>
                            {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                            })(
                            <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </FormItem>

                    </Form>
                </Col>
            </Row>
        );
    }


}


const WrappedHorizontalLoginForm = Form.create()(AntdForm);


export { WrappedHorizontalLoginForm as AntdForm};