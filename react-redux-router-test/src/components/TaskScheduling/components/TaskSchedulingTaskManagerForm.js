import React from 'react';
import {Row, Col,Select, Form ,Icon,Input,Button} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const ButtonGroup = Button.Group;
class TaskSchedulingTaskManagerForm extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props.taskInfo);
        this.state = {
            //表格数据
            groupData : [],
        }
    }


    componentDidMount(){
        //加载下拉菜单
        fetch('http://127.0.0.1:8080/jobengine/getallgroup', {
            method: 'POST',// 指定是POST请求
            headers:{
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                filters:[],
                pageNo:0,
                pageSize:0,
              })// 这里是请求参数
        })
        .then((res)=>{            
            return res.text()
        })
        .then((res)=>{
            const data = JSON.parse(res);
            var dataWapper =  data.entity.map((item,index) => {
                item.key = item.groupID;
                item.value = item.groupID;
                item.text = item.groupName;
                return item;
            })
            //console.log(dataWapper) ;
            this.setState({
                groupData : dataWapper
            })
        })
    }

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
            this.props.onFormSubmit({...this.props.taskInfo,...this.props.form.getFieldsValue()},this);
        }

            
        });
    }

    render(){

        const options = this.state.groupData.map(d => <Option key={d.text}>{d.text}</Option>);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 10 },
            },
            wrapperCol: {
              xs: { span: 12 },
            },
        };
        
        const taskInfo = this.props.taskInfo;
        //alert(taskInfo.jobName)
        console.log("render () ------------- ")
        console.log(taskInfo)
        return(
            
            <div>
                <Form  onSubmit={this.handleSubmit} className="login-form">

                    <Row>
                        <Col span={12}>
                       
                    <FormItem
                    
                        {...formItemLayout}
                        label="JOB分组"
                        >
                        {getFieldDecorator('groupName', {
                            initialValue:taskInfo.groupName,
                            rules: [{
                                    required: true, 
                                    message: '该输入项为必输项!',
                                }
                            ],
                        })(
                            <Select 
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {options}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="JOB名称"
                        >
                        {getFieldDecorator('jobName', {
                            initialValue:taskInfo.jobName,
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
                        label="类型"
                        >
                        {getFieldDecorator('type', {
                            /*rules: [{
                                required: true, message: '该输入项为必输项!',
                            }],*/
                        })(
                            <Select>
                               <Option key="-1" >标准CronTab类型</Option>
                            </Select>
                        )}
                    </FormItem>
                    </Col>
                    <Col span={12}>


                    <FormItem
                        {...formItemLayout}
                        label="定时表达式"
                        >
                        {getFieldDecorator('cronTabDesc', {
                            initialValue:taskInfo.cronTabDesc,
                            rules: [{
                                required: true, message: '该输入项为必输项!',
                                },
                                {
                                    max:100,
                                    message: '长度小于100!',
                                }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>


                    <FormItem
                        {...formItemLayout}
                        label="JOB执行入口"
                        >
                        {getFieldDecorator('mainClassName', {
                            initialValue:taskInfo.mainClassName,
                            rules: [
                                {
                                    required: true, 
                                    message: '该输入项为必输项!',
                                }, {
                                    max:100,
                                    message: '长度小于100!',
                                }
                            ],
                        })(
                            <Input  />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="调用方式"
                        >
                        {getFieldDecorator('call_method', {
                            initialValue:taskInfo.call_method,
                            /*rules: [{
                            required: true, message: 'Please input your password!',
                            }, {
                            validator: this.validateToNextPassword,
                            }],*/
                        })(
                            <Select>
                               <Option key="0" >GET</Option>
                               <Option key="1" >POST</Option>
                            </Select>
                        )}
                    </FormItem>


                    </Col>
                    </Row>
                    <Row>
                    <Col span={24}>

                    <FormItem
                        {...formItemLayout}
                        label="请求地址"
                        labelCol={{
                            xs: { span: 5},
                        }}

                        wrapperCol={{
                            xs: { span: 18 },
                        }}
                        >
                        {getFieldDecorator('call_url', {
                            initialValue:taskInfo.call_url,
                            rules: [
                                {
                                    required: true, 
                                    message: '该输入项为必输项!',
                                }, {
                                    max:150,
                                    message: '长度小于150!',
                                }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="请求体"
                        labelCol={{
                            xs: { span: 5},
                        }}

                        wrapperCol={{
                            xs: { span: 18 },
                        }}
                        >
                        {getFieldDecorator('post_body', {
                            initialValue:taskInfo.post_body,
                            rules: [{
                                max:100,
                                message: '长度小于100!',
                            }],
                        })(
                            <TextArea rows={4} />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="JOB描述"

                        labelCol={{
                            xs: { span: 5},
                        }}

                        wrapperCol={{
                            xs: { span: 18 },
                        }}


                        >
                        {getFieldDecorator('jobDesc', {
                            initialValue:taskInfo.jobDesc,
                            rules: [{
                                max:100,
                                message: '长度小于100!',
                            }],
                        })(
                            <TextArea rows={4} />
                        )}
                    </FormItem>
                    
                    </Col>
                    </Row>
                    <div style={{textAlign:"right"}}>
                        
                        <ButtonGroup>
                            

                            <Button onClick={this.clearData}>重置</Button>
                            <Button type="primary" onClick={this.submitForm}>保存</Button>
                            <Button onClick={this.props.closeAddTaskModal}>关闭</Button>

                        </ButtonGroup>
                    </div>
                </Form>
            </div>
        )
    }
}


const WrappedTaskSchedulingTaskManagerForm = Form.create()(TaskSchedulingTaskManagerForm);


export {WrappedTaskSchedulingTaskManagerForm as TaskSchedulingTaskManagerForm}