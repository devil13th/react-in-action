import React from 'react';
import { Input,InputNumber, DatePicker,Form, Row, Col,  Divider, Button } from 'antd';
import MyRpcSelect from '../../../../components/custom/MyRpcSelect';
import moment from 'moment';
class SysDicPubForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const { form } = this.props;
        if(this.props.entity){
        	//处理日期类型属性    将字符串转moment对象
			if(this.props.entity.testDate){
				this.props.entity.testDate = moment(this.props.entity.testDate,"YYYY-MM-DD");
			}
			if(this.props.entity.testDatetime){
				this.props.entity.testDatetime = moment(this.props.entity.testDatetime,"YYYY-MM-DD kk:mm:ss");
			}
        }
        
        
        form.setFieldsValue(this.props.entity)
    }

    //保存
    saveSysDicPub = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
            	//处理日期类型属性  将moment对象转字符串
            	if(values.testDate){
					values.testDate = values.testDate.format("YYYY-MM-DD");
				}
				if(values.testDatetime){
					values.testDatetime = values.testDatetime.format("YYYY-MM-DD kk:mm:ss");
				}
                
                
                console.log(values);
                this.props.onSave(values);
            }
        });
    }

    render() {
        const _this = this;
        //form 栅格化布局 (label和控件)
        const sysDicPubformItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 }
            }

        };

        const { getFieldDecorator } = this.props.form;
        //const colLayout = {xs:24,sm:12,md:12,lg:8,xl:8,xxl:6}

        //栅格布局(每个表单元素(label+控件))
        const colLayout = { xs: 24 }
        return (
            <div>
                <form layout="vertical">
                    <Row >
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="assigned主键"
                            >
                                {getFieldDecorator('testId', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input assigned主键 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="字符串"
                            >
                                {getFieldDecorator('testName', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 字符串 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="整数"
                            >
                                {getFieldDecorator('testInt', {
                                    rules: [{
                                        required: true, message: 'Please input 整数 !',
                                    }]
                                })(
                                    <InputNumber max={30} min={0} precision={0}/>
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="浮点"
                            >
                                {getFieldDecorator('testFloat', {
                                    rules: [{
                                        required: true, message: 'Please input 浮点 !',
                                    }]
                                })(
                                    <InputNumber max={30} min={0} precision={2}/>
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="数值"
                            >
                                {getFieldDecorator('testDecimal', {
                                    rules: [{
                                        required: true, message: 'Please input 数值 !',
                                    }]
                                })(
                                    <InputNumber max={30} min={0} precision={2}/>
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="日期"
                            >
                                {getFieldDecorator('testDate', {
                                    rules: [{
                                        required: true, message: 'Please input 日期 !',
                                    }],
                                })(
                                    <DatePicker format="YYYY-MM-DD"/>
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="日期时间"
                            >
                                {getFieldDecorator('testDatetime', {
                                    rules: [{
                                        required: true, message: 'Please input 日期时间 !',
                                    }],
                                })(
                                    <DatePicker format="YYYY-MM-DD kk:mm:ss" showTime={true}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24} style={{ textAlign: "right" }}>
                            <Button style={{ marginRight: 8 }} onClick={this.props.onCancel} >Canel</Button>
                            <Button type="primary" onClick={this.saveSysDicPub} loading={_this.props.onSaveLoading}>Save</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

const WrappedSysDicPubForm = Form.create()(SysDicPubForm);
export default WrappedSysDicPubForm;