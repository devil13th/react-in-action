import React from 'react';
import { Input,InputNumber, DatePicker,Form, Row, Col,  Divider, Button } from 'antd';
import moment from 'moment';
import MyRpcSelect from '../../../../components/custom/MyRpcSelect';

class SysDicPubForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const { form } = this.props;
        if(this.props.entity){
            this.props.entity.creTime = moment(this.props.entity.creTime,"YYYY-MM-DD kk:mm:ss");
            this.props.entity.modTime = moment(this.props.entity.modTime,"YYYY-MM-DD");
        }

        form.setFieldsValue(this.props.entity);

    }

    //保存
    saveSysDicPub = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                values.creTime = values.creTime.format("YYYY-MM-DD kk:mm:ss");
                values.modTime = values.modTime.format("YYYY-MM-DD");
                //console.log(values);
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
                                {getFieldDecorator('classifyId', {
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
                                label="分类名称"
                            >
                                {getFieldDecorator('classifyName', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 分类名称 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="分类备注"
                            >
                                {getFieldDecorator('classifyDesc', {
                                    rules: [{
                                        max: 30,message:' Max : 30'
                                    },{
                                        min: 0,message:' Min : 0'
                                    }, {
                                        required: true, message: 'Please input 分类备注 !',
                                    }]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="创建时间"
                            >
                                {getFieldDecorator('creTime', {
                                    //initialValue: _this.props.entity.creTime ? moment(_this.props.entity.creTime, 'YYYY-MM-DD kk:mm:ss') : null,
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
                                        required: true, message: 'Please input 创建人 !',
                                    }]
                                })(
                                    <InputNumber max={30} min={0} />
                                )}
                            </Form.Item>
                        </Col>
                      	<Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="修改时间"
                            >
                                {getFieldDecorator('modTime', {
                                    //initialValue: _this.props.entity.modTime ? moment(_this.props.entity.modTime, 'YYYY-MM-DD') : null,
                                    rules: [{
                                        required: true, message: 'Please input 修改时间 !',
                                    }],
                                })(
                                    <DatePicker format="YYYY-MM-DD"/>
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
                                        required: true, message: 'Please input 修改人 !',
                                    }]
                                })(
                                    <InputNumber max={30} min={0} precision={2}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24} style={{ textAlign: "right" }}>
                            <Button style={{ marginRight: 8 }} onClick={this.props.onCancel}>Canel</Button>
                            <Button type="primary" onClick={this.saveSysDicPub}>Save</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

const WrappedSysDicPubForm = Form.create()(SysDicPubForm);
export default WrappedSysDicPubForm;