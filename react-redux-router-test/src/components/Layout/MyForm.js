import React from 'react';
import { Row,Col,Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class MyForm extends React.Component {
  constructor(props){
    super(props);
  
  }

  render() {

    return (
      <div>
        <Row>
          <Col span={3} offset={4} style={{textAlign:"left",lineHeight:"30px"}}>表单ID</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="表单ID" /></Col>
          
          <Col span={3} offset={2} style={{textAlign:"left",lineHeight:"30px"}}>菜单功能ID</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="菜单功能ID" /></Col>
        </Row>
        <Row>
          <Col span={3} offset={4} style={{textAlign:"left",lineHeight:"30px"}}>表单名称</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="表单名称" /></Col>
          
          <Col span={3} offset={2} style={{textAlign:"left",lineHeight:"30px"}}>菜单标题</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="菜单标题" /></Col>
        </Row>
        <Row>
          <Col span={3} offset={4} style={{textAlign:"left",lineHeight:"30px"}}>表单标题</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="表单标题" /></Col>
          
          <Col span={3} offset={2} style={{textAlign:"left",lineHeight:"30px"}}>上级菜单功能ID</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><Input size="small" placeholder="上级菜单功能ID" /></Col>
        </Row>
        <Row>
          <Col span={3} offset={4} style={{textAlign:"left",lineHeight:"30px"}}>描述</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><TextArea rows={4} /></Col>
          
          <Col span={3} offset={2} style={{textAlign:"left",lineHeight:"30px"}}>菜单描述</Col>
          <Col span={4} style={{textAlign:"left",lineHeight:"30px"}}><TextArea rows={4} /></Col>
        </Row>
      
       
      </div>
    );
  }
}

export default MyForm