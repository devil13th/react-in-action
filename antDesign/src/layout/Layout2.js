import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
const { Header, Content, Footer } = Layout;

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './Layout2.css';
class Layout2 extends React.Component{
    constructor(props ){
        super(props);
    }
    render(){
      return (

        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/Layout1">Layout1</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/Layout2">Layout2</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/Layout3">Layout3</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/Layout4">Layout4</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>

          
          

      );
    }
}



export {Layout2 as Layout2};