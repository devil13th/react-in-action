import React from 'react';
import { Form,DatePicker,InputNumber, Row, Col, Button, Input, Select, Tooltip, Popover, Popconfirm, Icon } from 'antd';
import MyRpcSelect from '../../../../components/custom/MyRpcSelect';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
class SysDicPubClassifySearch extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const { form } = this.props;
        //设置表单的值
        form.setFieldsValue(this.props.queryCondition)
    }


    submitForm = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                //console.log("------------");
                //console.log(values);
                this.props.searchSysDicPubClassify(values);
            }
        });
    }

    resetForm = () => {
        const { form } = this.props;
        form.resetFields();
        this.submitForm();
    }

    onSearch = (v) => {
        this.props.onDicClassifySearch(v);
    }

    render() {
        const _this = this;
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 4 },
                sm: { span: 4 },
            },
        };




        const { getFieldDecorator } = this.props.form;
        const moreCondition = (
            <div className="moreCondition">
                <Form layout="inline">
                    <table>
                        <tbody>
                            <tr>     
                                <td>
					            	 主键：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('CLASSIFY_ID')(
                                            <Input style={{ width: 150 }} />
                                        )}
                                    </Form.Item>
                                </td>
                                <td>
					            	 分类名称：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('CLASSIFY_NAME')(
                                            <Input style={{ width: 150 }} />
                                        )}
                                    </Form.Item>
                                </td>
                                <td>
					            	 分类备注：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('CLASSIFY_DESC')(
                                            <Input style={{ width: 150 }} />
                                        )}
                                    </Form.Item>
                                </td>
                                <td>
					            	 创建时间：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('CRE_TIME')(
                                            <DatePicker />
                                        )}
                                    </Form.Item>
                                </td>
                           		<td>
					            	 创建人：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('CRE_USER',)(
                                            <InputNumber style={{ width: 150 }} />
                                        )}
                                    </Form.Item>
                                </td>
                                <td>
					            	 修改时间：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('MOD_TIME')(
                                            <DatePicker />
                                        )}
                                    </Form.Item>
                                </td>
                      			<td>
					            	 修改人：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('MOD_USER')(
                                            <InputNumber style={{ width: 150 }} />
                                        )}
                                    </Form.Item>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </div>
        );




        let deleteBton = null;
        if (this.props.selectedEntityIds && this.props.selectedEntityIds.length > 0) {
            deleteBton = (
                <Popconfirm
                    title="Are you sure delete these record ?"
                    placement="left"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => { this.props.deleteSysDicPubClassifyBatch(this.props.selectedEntityIds) }}
                >
                    <Button icon="delete" ></Button>
                </Popconfirm>
            )
        } else {
            deleteBton = (
                <Button icon="delete" disabled={true}></Button>
            )
        }

        return (


            <div className="search">

                <Row gutter={24}>
                    <Col span={20}>
                        <Form layout="inline">



                            <InputGroup compact >
                                {getFieldDecorator('dicName', {
                                })(
                                    <Input style={{ width: 150 }} placeholder="关键字" />
                                )}
                                <Tooltip placement="top" title="Search">
                                    <Button icon="search" loading={this.props.queryListLoading} onClick={this.submitForm} type="primary"></Button>
                                </Tooltip>
                                <Tooltip placement="top" title="more condition">
                                    <Popover
                                        style={{ background: "red" }}
                                        content={moreCondition}
                                        placement="bottom"
                                        trigger="click"
                                    >
                                        <Button><Icon type="ellipsis" rotate={90} /></Button>
                                    </Popover>
                                </Tooltip>

                                <Tooltip placement="top" title="Reset">
                                    <Button icon="redo" onClick={this.resetForm} ></Button>
                                </Tooltip>
                            </InputGroup>

                        </Form>
                    </Col>
                    <Col span={4} style={{ textAlign: "right" }}>

                        <ButtonGroup>
                            <Tooltip placement="top" title="new">
                                <Button type="primary" icon="plus" onClick={this.props.openSysDicPubClassifyForm}></Button>
                            </Tooltip>

                            <Tooltip placement="top" title="delete">
                                {deleteBton}
                            </Tooltip>
                        </ButtonGroup>
                    </Col>
                </Row>

            </div>
        )
    }
}

//export default SysDicPubClassifySearch;

//1.封装form 
//2.初始化form组件值
const WrappedSysDicPubClassifySearch = Form.create()(SysDicPubClassifySearch);
export default WrappedSysDicPubClassifySearch;


