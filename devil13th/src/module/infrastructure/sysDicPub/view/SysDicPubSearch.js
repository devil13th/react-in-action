import React from 'react';
import {Form, Row, Col,Button,Input,Select,Tooltip,Popover,Popconfirm,Icon} from 'antd';
import MyRpcSelect from '../../../../components/custom/MyRpcSelect';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
class SysDicPubSearch extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        const {form} = this.props;
        //设置表单的值
        form.setFieldsValue(this.props.queryCondition)
    }


    submitForm = () => {
        const {form} = this.props;
        form.validateFields((err, values) => {
            if(!err){
                //console.log("------------");
                //console.log(values);
                this.props.searchSysDicPub(values);
            }
        });
    }

    resetForm = () => {
        const {form} = this.props;
        form.resetFields();
        this.submitForm();
    }

    onSearch = (v) => {
        this.props.onDicClassifySearch(v);
    }

    render(){
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

       


        const {getFieldDecorator} = this.props.form;
        const moreCondition = (
        <div className="moreCondition">
        <Form layout="inline">
            <table>
                <tbody>
                <tr>
                    <td>
                        分类：
                    </td>
                    <td>
                        <Form.Item>
                            {getFieldDecorator('dicClassify', {
                                rules: [{
                                    max: 50, message: '长度小于50',
                                }],
                            })(

                                <MyRpcSelect
                                    style={{width:150}}
                                    tableName="sys_dic_pub_classify"
                                    keyColumn="classify_id"
                                    valueColumn="classify_name"
                                >
                                </MyRpcSelect>

                                
                            )}
                        </Form.Item>
                    </td>

                    <td>
                        描述：
                    </td>
                    <td>
                        <Form.Item>
                            {getFieldDecorator('dicDesc', {
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
        );

                                

        
        let deleteBton = null;
        if(this.props.selectedEntityIds && this.props.selectedEntityIds.length > 0){
            deleteBton = (
                <Popconfirm 
                        title="Are you sure delete these record ?" 
                        placement="left"
                        okText="Yes" 
                        cancelText="No"
                        onConfirm={() => {this.props.deleteSysDicPubBatch(this.props.selectedEntityIds)}}
                >
                    <Button icon="delete" ></Button>
                </Popconfirm>
            )
        }else{
            deleteBton = (
                <Button icon="delete" disabled={true}></Button>
            )
        }

        return(

            
            <div className="search">
                
                <Row gutter={24}>
                    <Col span={20}>
                        <Form layout="inline">


                        
                        <InputGroup compact >
                            {getFieldDecorator('dicName', {
                            })(
                                <Input style={{width:150}} placeholder="关键字"/> 
                            )}
                            <Tooltip placement="top" title="Search">
                                <Button icon="search" loading={this.props.queryListLoading} onClick={this.submitForm} type="primary"></Button>
                            </Tooltip>
                            <Tooltip placement="top" title="more condition">
                                <Popover 
                                    style={{background:"red"}}
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
                    <Col span={4} style={{textAlign:"right"}}>
 
                        <ButtonGroup>
                            <Tooltip placement="top" title="new">
                                <Button  type="primary" icon="plus" onClick={this.props.openSysDicPubForm}></Button>
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

//export default SysDicPubSearch;

//1.封装form 
//2.初始化form组件值
const WrappedSysDicPubSearch = Form.create()(SysDicPubSearch);
export default WrappedSysDicPubSearch;


