import React from 'react';
import {TreeSelect,Popover,Radio,Button,Form,Menu,Tree,Input,DatePicker,Dropdown, Row, Col,Icon,Select,Switch} from 'antd';
import moment from 'moment';
const { TreeNode } = Tree;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;
const {SubMenu} = Menu;
const {Option} = Select;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Search extends React.PureComponent{ 
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }else{
            return <TreeNode {...item} dataRef={item} />;
        }
        
    })

    queryList = () => {
        const condition = this.props.form.getFieldsValue();
        this.props.queryList(condition);
    }

    resetFields = () => {
        //清理掉表单的数据
        this.props.form.resetFields();
        this.props.clearQueryParams();
        
    }

    render(){
        
        const menu = (
            <Menu >
              <Menu.Item key="1">1st menu item</Menu.Item>
              <Menu.Item key="2">2nd menu item</Menu.Item>
              <Menu.Item key="3">3rd menu item</Menu.Item>
              <SubMenu title="disabled sub menu" >
                <Menu.Item>5d menu item</Menu.Item>
                <Menu.Item>6th menu item</Menu.Item>
                </SubMenu>
            </Menu>
        );
        const treeData = [{
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [{
              title: 'Child Node1',
              value: '0-0-1',
              key: '0-0-1',
            }, {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2',
            }],
          }, {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
          }];
        
        const sortClassifySelect = <div>
            <Tree 
               
            >
                {this.renderTreeNodes(treeData)}
            </Tree>
        </div>

        const dateFormat = 'YYYY/MM/DD';
        const monthFormat = 'YYYY/MM'; 
        const moreSearch = (
            <div style={{width:800}}>
                <Row gutter={24}>
                    
                    <Col span={24}>
                        <InputGroup compact > 
                            <Select defaultValue="lucy" style={{ width: 80 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                            <RangePicker addonAfter="范围"/>
                            <Dropdown overlay={menu}>
                                <Button>
                                    Act <Icon type="down" />
                                </Button>
                            </Dropdown>
                            
                            <Button type="primary" icon="plus" >创建</Button>
                        </InputGroup>
                    </Col>
                </Row>

                
            </div>
          );
        
        const createMenu = (
        <Menu >
            <Menu.Item key="1" onClick={this.props.showDrawer}><Icon type="user" />记事</Menu.Item>
            <Menu.Item key="2" onClick={this.props.showDrawer}><Icon type="user" />备忘</Menu.Item>
            <Menu.Item key="3" onClick={this.props.showDrawer}><Icon type="user" />收集</Menu.Item>
        </Menu>
        );

        const {getFieldDecorator} = this.props.form;
        const queryParams = this.props.queryParams;

        

        return (
            <div>
                <Row gutter={24}>
                    <Col span={14}>
                        
                    <Form layout="inline">
                        <InputGroup compact>
                        
                            <Popover placement="bottomLeft" title="请选择分类" content={sortClassifySelect} >
                                <Button type="dashed">全部分类</Button>
                            </Popover>

                            
                            {getFieldDecorator('NOTE_TITLE', {
                                initialValue : queryParams.NOTE_TITLE ? queryParams.NOTE_TITLE : ""
                            })(
                                <Input placeholder="关键字" style={{ width: 180 }} />
                            )}
{/* 
                            <TreeSelect
                                allowClear={true}
                                style={{ width: 200 }}
                                placeholder="分类"
                                dropdownStyle={{ maxHeight: 100, overflow: 'auto' }}
                                treeData={treeData} 
                                treeDefaultExpandAll
                                onChange={this.onChange}
                            />
*/}
                            

                            <Button loading={this.props.loading}  onClick={this.queryList} icon="search" type="primary">搜索</Button>
                            <Button loading={this.props.loading} type="default" onClick={this.resetFields}>重置</Button>
                            <Popover placement="bottom" title="请设置查询条件" content={moreSearch} trigger="click">
                                <Button>更多 <Icon type="right" /></Button>
                            </Popover>

                        </InputGroup>    
                    </Form>
                    </Col>
                    <Col span={10} style={{textAlign:"right"}}>
                        <RadioGroup defaultValue="a" style={{marginRight:8}}>
                            <RadioButton value="a">全部</RadioButton>
                            <RadioButton value="b">记事</RadioButton>
                            <RadioButton value="c">备忘</RadioButton>
                            <RadioButton value="d">收集</RadioButton>
                        </RadioGroup>
                        <Dropdown overlay={createMenu}>
                        <Button type="primary" icon="plus" >创建</Button>
                        </Dropdown>
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
export {WrappedSearch as Search}