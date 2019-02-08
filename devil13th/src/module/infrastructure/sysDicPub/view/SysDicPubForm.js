import React from 'react';
import { Input, Form, Row, Col, Select, Divider, Button } from 'antd';
import MyRpcSelect from '../../../../components/custom/MyRpcSelect';

class SysDicPubForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const { form } = this.props;
        form.setFieldsValue(this.props.entity)
    }


    //保存
    saveSysDicPub = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.onSave(values);
            }
        });
    }

    render() {
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
                                label="Dic Id"
                            >
                                {getFieldDecorator('dicId', {
                                    rules: [{
                                        max: 50
                                    }, {
                                        required: true, message: 'Please input Dic Id !',
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>


                            
                        </Col>
                        <Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="Dic Name"
                            >
                                {getFieldDecorator('dicName', {
                                    rules: [{
                                        max: 30
                                    }, {
                                        required: true, message: 'Please input Dic Name !',
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="Dic Classify"
                            >
                                {getFieldDecorator('dicClassify', {
                                    rules: [{
                                        required: true, message: 'Please input Dic Classify !',
                                    }],
                                })(
                                    <MyRpcSelect
                                        tableName="sys_dic_pub_classify"
                                        keyColumn="classify_id"
                                        valueColumn="classify_name"
                                    >
                                    </MyRpcSelect>
                                 /*
                                    <Select 
                                        showSearch
                                        style={{width:250}}
                                        allowClear={true}
                                        onSearch={this.onSearch}
                                        filterOption={false}
                                    >
                                        {options}
                                    </Select>
                                */
                                )}
                            </Form.Item>
                        </Col>
                        <Col {...colLayout}>
                            <Form.Item
                                {...sysDicPubformItemLayout}
                                label="Description"
                            >
                                {getFieldDecorator('dicDesc', {
                                    rules: [{
                                        max: 300
                                    }],
                                })(
                                    <Input />
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