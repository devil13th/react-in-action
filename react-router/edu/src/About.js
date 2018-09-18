import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import About1 from './About1';
import About2 from './About2';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class About extends Component {
  render() {
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >






            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
              <Menu.Item key="1"><Link to="/about">about</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/about/about1">about1</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/about/about2">about2</Link></Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Route exact path='/about' component={About1} />
            <Route path='/about/about1' component={About1} />
            <Route path='/about/about2' component={About2} />
          </Content>
        </Layout>
      </Layout>

    );
  }
}

export default About;