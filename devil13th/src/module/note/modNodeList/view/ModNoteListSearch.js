import React from 'react';
import { Radio,Form,DatePicker,InputNumber,Badge, Row, Col, Button, Input, Select, Tooltip, Popover, Popconfirm, Icon } from 'antd';
import MyRpcSelect from '../../../../components/custom/MyRpcSelect';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
class ModNoteListSearch extends React.Component {
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
                this.props.searchModNoteList(values);
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

    changeLayout = (e) => {
        this.props.changeLayout(e.target.value)
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
					            	 标题：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('NOTE_TITLE')(
                                            <Input style={{ width: 150 }} />
                                        )}
                                    </Form.Item>
                                </td>
                                <td>
					            	 概述：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('NOTE_DESC')(
                                            <Input style={{ width: 150 }} />
                                        )}
                                    </Form.Item>
                                </td>
                                <td>
					            	 分类：
					            </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('NOTE_CLASSIFY')(
                                            <Input style={{ width: 150 }} />
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
                    onConfirm={() => { this.props.deleteModNoteListBatch(this.props.selectedEntityIds) }}
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
                    <Col span={16}>
                        <Form layout="inline">
                            <InputGroup compact >
                                {getFieldDecorator('KEYWORLD', {
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
                    <Col span={8} style={{ textAlign: "right" }}>
                        <Radio.Group style={{ marginRight: 8}} value={this.props.layout} onChange={this.changeLayout}>
                            <Tooltip placement="top" title="List Mod">
                                <Radio.Button icon="save" value="list"><Icon type="pic-center"></Icon></Radio.Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Read Mod">
                                <Radio.Button icon="save" value="read"><Icon type="pic-right"></Icon></Radio.Button>
                            </Tooltip>
                            <Radio.Button icon="save" value="small"><Icon type="appstore"></Icon></Radio.Button>
                        </Radio.Group>

                        <ButtonGroup>
                            <Tooltip placement="top" title="new">
                                <Button type="primary" icon="plus" onClick={this.props.openModNoteListForm}></Button>
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

//export default ModNoteListSearch;

//1.封装form 
//2.初始化form组件值
const WrappedModNoteListSearch = Form.create()(ModNoteListSearch);
export default WrappedModNoteListSearch;


