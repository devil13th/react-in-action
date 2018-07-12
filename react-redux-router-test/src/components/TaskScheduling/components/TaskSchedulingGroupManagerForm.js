import React from 'react';
import {Form,Icon,Input,Button} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
class TaskSchedulingGroupManagerForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    //清除信息
    clearData = () => {
        this.props.form.resetFields()
    }
    

    submitForm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);

                //console.log(this.props.form.getFieldsValue());
                //console.log(this.props.form);
                //将表单填写的数据覆盖传递进来的任务信息
                this.props.onFormSubmit({...this.props.groupInfo,...this.props.form.getFieldsValue()},this);
            }
        });
    }

    render(){

        const { getFieldDecorator } = this.props.form;

        const taskInfo = this.props.taskInfo;
        
        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 20 },
            },
        };

        const groupInfo = this.props.groupInfo || {};

        return(
            <div>
                <Form  onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="组名称"
                        >
                        {getFieldDecorator('groupName', {
                            initialValue:groupInfo.groupName,
                            //initialValue:(function(){alert(taskInfo.jobName + "123");return taskInfo.jobName})(),
                            rules: [
                                    {
                                        required: true, 
                                        message: '该输入项为必输项!',
                                    }, {
                                        max:50,
                                        message: '长度小于50!',
                                    }
                                ],
                        })(
                            <Input  />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="组描述"
                        
                        >
                        {getFieldDecorator('groupDesc', {
                            initialValue:groupInfo.groupDesc,
                            rules: [{
                                max:100,
                                message: '长度小于100!',
                            }],
                        })(
                            <TextArea rows={4} />
                        )}
                    </FormItem>

                    <div style={{textAlign:"right"}}>
                        
                        <ButtonGroup>
                            <Button onClick={this.clearData}>重置</Button>
                            <Button type="primary" onClick={this.submitForm}>保存</Button>
                            <Button onClick={this.props.closeGroupModal}>关闭</Button>
                        </ButtonGroup>
                    </div>
                </Form>
            </div>
        )
    }
}

const WrappedTaskSchedulingGroupManagerForm = Form.create()(TaskSchedulingGroupManagerForm);


export {WrappedTaskSchedulingGroupManagerForm as TaskSchedulingGroupManagerForm}