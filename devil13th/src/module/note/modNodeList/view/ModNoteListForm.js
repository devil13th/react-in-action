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
			
						if(this.props.entity.expireDate){
				this.props.entity.expireDate = moment(this.props.entity.expireDate,"YYYY-MM-DD");
			}
			if(this.props.entity.creTime){
				this.props.entity.creTime = moment(this.props.entity.creTime,"YYYY-MM-DD kk:mm:ss");
			}
			if(this.props.entity.modTime){
				this.props.entity.modTime = moment(this.props.entity.modTime,"YYYY-MM-DD kk:mm:ss");
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
            	if(values.expireDate){
					values.expireDate = values.expireDate.format("YYYY-MM-DD");
				}
				if(values.creTime){
					values.creTime = values.creTime.format("YYYY-MM-DD kk:mm:ss");
				}
				if(values.modTime){
					values.modTime = values.modTime.format("YYYY-MM-DD kk:mm:ss");
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
                                label="主键"
                            >
                                {getFieldDecorator('noteId', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 主键 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="标题"
                            >
                                {getFieldDecorator('noteTitle', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 标题 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="概述"
                            >
                                {getFieldDecorator('noteDesc', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 概述 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="分类"
                            >
                                {getFieldDecorator('noteClassify', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 分类 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="是否删除"
                            >
                                {getFieldDecorator('isDelete', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 是否删除 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="到期日期"
                            >
                                {getFieldDecorator('expireDate', {
                                    rules: [{
                                        required: true, message: 'Please input 到期日期 !',
                                    }],
                                })(
                                    <DatePicker format="YYYY-MM-DD"/>
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="预警天数"
                            >
                                {getFieldDecorator('alarmDays', {
                                    rules: [{
                                        required: true, message: 'Please input 预警天数 !',
                                    }]
                                })(
                                    <InputNumber max={30} min={0}  precision={0}/>
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="创建时间"
                            >
                                {getFieldDecorator('creTime', {
                                    rules: [{
                                        required: true, message: 'Please input 创建时间 !',
                                    }],
                                })(
                                    <DatePicker format="YYYY-MM-DD kk:mm:ss" showTime={true}/>
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="创建人"
                            >
                                {getFieldDecorator('creUser', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 创建人 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="修改时间"
                            >
                                {getFieldDecorator('modTime', {
                                    rules: [{
                                        required: true, message: 'Please input 修改时间 !',
                                    }],
                                })(
                                    <DatePicker format="YYYY-MM-DD kk:mm:ss" showTime={true}/>
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="修改人"
                            >
                                {getFieldDecorator('modUser', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 修改人 !',
                                    }]
                                })(
                                    <Input />
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