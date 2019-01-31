import React from 'react';
import {Form, Row, Col,Button,Input,Select,Tooltip,Popover} from 'antd';

const ButtonGroup = Button.Group;

class SysDicPubSearch extends React.Component{
    constructor(props){
        super(props);
    }

    submitForm = () => {
        const {form} = this.props;
        form.validateFields((err, values) => {
            console.log(values);
            
        });
    }

    render(){
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

        const {getFieldDecorator} = this.props.form;
        const moreCondition = 
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
                            {getFieldDecorator('a.a', {
                                initialValue: ""
                            })(
                                <Input style={{width:150}}/> 
                            )}
                        </Form.Item>
                    </td>

                    <td>
                        分类：
                    </td>
                    <td>
                        <Form.Item>
                            {getFieldDecorator('a.b', {
                                initialValue: "",
                                rules: [{
                                    max: 50, message: '长度小于50',
                                }],
                            })(
                                <Select style={{width:150}}/>
                            )}
                        </Form.Item>
                    </td>

                    <td>
                        描述：
                    </td>
                    <td>
                        <Form.Item>
                            {getFieldDecorator('a.c', {
                                initialValue: ""
                            })(
                                <Input style={{width:150}}/> 
                            )}
                        </Form.Item>
                    </td>
                   
                </tr>
                </tbody>
            </table>
        </Form>
        </div>
        return(

            
            <div className="search">
                
                <Row gutter={24}>
                    <Col span={20}>
                        <Form layout="inline">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    标题：
                                </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('b.c', {
                                            initialValue: ""
                                        })(
                                            <Input style={{width:150}}/> 
                                        )}
                                    </Form.Item>
                                </td>

                                <td>
                                    分类：
                                </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('b.d', {
                                            initialValue: "",
                                            rules: [{
                                                max: 50, message: '长度小于50',
                                            }],
                                        })(
                                            <Select style={{width:150}}/>
                                        )}
                                    </Form.Item>
                                </td>

                                <td>
                                    描述：
                                </td>
                                <td>
                                    <Form.Item>
                                        {getFieldDecorator('b.e', {
                                            initialValue: ""
                                        })(
                                            <Input style={{width:150}}/> 
                                        )}
                                    </Form.Item>
                                </td>
                                <td>
                                    <ButtonGroup>
                                        
                                        <Button icon="search" onClick={this.submitForm} type="primary">Search</Button>
                                        <Tooltip placement="right" title="more condition">
                                        <Popover 
                                            style={{background:"red"}}
                                            content={moreCondition}
                                            placement="bottom"
                                            trigger="click"
                                        >
       
      
                                            <Button icon="plus-circle" ></Button>
                                            </Popover>
                                        </Tooltip>
                                    </ButtonGroup>
                                    
                                    
                                </td>
                                
                            </tr>
                            </tbody>
                        </table>
                        
                        </Form>
                    </Col>
                    <Col span={4} style={{textAlign:"right"}}>
                        
                        <Button  type="primary" icon="plus" >新建</Button>
                        
                    </Col>
                </Row>
                
            </div>
        )
    }
}

//export default SysDicPubSearch;
const WrappedSysDicPubSearch = Form.create({})(SysDicPubSearch);
export default WrappedSysDicPubSearch;


