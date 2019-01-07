import React from 'react';
import { DatePicker, Button, Form, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

class Search extends React.Component {
    constructor(props) {
        super(props);
       
    }


    onSearch = () => {
        const condition = this.props.form.getFieldsValue();
        //console.log(condition);
        this.props.onSearch(condition);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ paddingBottom: 8 }}>
                <Row>
                    <Col span={20}>
                        <Form layout="inline" onSubmit={this.onSearch} >

                            <FormItem
                                label="姓名"
                            >
                                {getFieldDecorator('userName')(
                                    <Input style={{ width: 150 }} maxLength={100} autoComplete="off" />
                                )}
                            </FormItem>
                            <FormItem
                                label="性别"
                            >
                                {getFieldDecorator('userSex')(
                                    <Select allowClear={true} style={{ width: 150 }}>
                                        <Select.Option key="1" >男</Select.Option>
                                        <Select.Option key="0" >女</Select.Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="出生日期"
                            >
                                {getFieldDecorator('birS')(
                                    <DatePicker style={{ width: 150 }} />
                                )}
                            </FormItem>
                            <FormItem
                                colon={false}
                                label="~"
                            >
                                {getFieldDecorator('birE')(
                                    <DatePicker style={{ width: 150 }} />
                                )}
                            </FormItem>

                        </Form>
                    </Col>
                    <Col span={4} style={{ textAlign: "right" }}>
                        <Button
                            onClick={this.onSearch}
                            icon="search"
                        >
                            查询
                    </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}


const WrappedSearch = Form.create({
    onFieldsChange: function (props, fields) {
        //console.log(props);
        //console.log(fields)
    },
    onValuesChange: function (props, changedValues, allValues) {
        //console.log(props);
        //console.log(changedValues)
        //console.log(allValues)
    }
})(Search);

export { WrappedSearch as Search }

