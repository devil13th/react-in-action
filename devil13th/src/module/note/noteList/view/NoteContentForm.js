import React from 'react';
import moment from 'moment';
import { Modal, Form, DatePicker, TimePicker, Button, Input,message } from 'antd';


class NoteContentForm extends React.Component {
    constructor(props) {
        super(props);
    }

    //自定义的验证规则
    validatorBetween = (rule, value, callback) => {
        //console.log("----------------")
        //console.log(rule);
        if(value > rule.max || value < rule.min){
            callback(rule.min + "-" + rule.max + "之间");
        }else{
            callback();
        }
    }

    //提交
    handleOk = () => {
        const {form} = this.props;
        form.validateFields((err, values) => {
            //console.log(values);
            if (!err) {
                //格式化日期  从moment对象转成字符串
                values.expireDate = values.expireDate.format('YYYY-MM-DD')
                this.props.handleOk(values);
            }else{
                message.error("请根据错误提示进行修改",3);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        const noteContent = this.props.noteContent;
        return (

            <Modal
                title={this.props.title || "新建"}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.handleCancel}
                destroyOnClose={true}
                width={700}
                style={{ top: 10 }}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="标题"
                    >
                        {getFieldDecorator('noteTitle', {
                            initialValue: noteContent.noteTitle,
                            rules: [{
                                max: 50, message: '长度小于50',
                            }, {
                                required: true, message: '必填',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="分类"
                    >
                        {getFieldDecorator('noteClassify', {
                            initialValue: noteContent.noteClassify,
                            rules: [{
                                max: 50, message: '长度小于50',
                            }, {
                                required: true, message: '必填',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="期限"
                    >
                        {getFieldDecorator('expireDate', {
                            initialValue : noteContent.expireDate ? moment(noteContent.expireDate, 'YYYY-MM-DD') : null,
                            rules: [{ type: 'object', required: true, message: 'Please select time!' }]
                        })(
                            <DatePicker />
                        )}
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="预警天数"
                    >
                        {getFieldDecorator('alarmDays', {
                            initialValue: noteContent.alarmDays,
                            rules: [{
                                required: true, message: '必填'
                            },{
                                validator : this.validatorBetween,
                                max:50,
                                min:20
                            }]
                        })(
                            <Input />
                        )}
                    </Form.Item>


                    <Form.Item
                        {...formItemLayout}
                        label="摘要"
                    >
                        {getFieldDecorator('noteDesc', {
                            initialValue: noteContent.noteDesc,
                            rules: [{
                                max: 50, message: '长度小于50',
                            }, {
                                required: true, message: '必填',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}

const WrappedNoteContentForm = Form.create({ name: 'time_related_controls' })(NoteContentForm);
export default WrappedNoteContentForm;