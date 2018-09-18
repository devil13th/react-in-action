import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import { Home } from './Home.js';
import { About } from './About.js';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Table, Divider, Tag } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class DefaultIndex extends Component {
  render() {
    const columns = [{
      title: '知识点',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '文件位置',
      dataIndex: 'addr',
      key: 'addr',
    }];
    const data = [{
      key: '1',
      name: '嵌套路由',
      addr: 'index.js | Home.js | About.js',
     
    }, {
      key: '2',
      name: 'exact属性',
      addr: 'Home.js',
     
    }, {
      key: '3',
      name: 'Switch组件',
      addr: 'Home菜单(Home.js).js',
     
    }, {
      key: '4',
      name: 'Redirect属性',
      addr: 'Home菜单(Home.js)',
     
    }, {
      key: '5',
      name: 'props.match属性',
      addr: 'param菜单 (Param.js)',
     
    }, {
      key: '6',
      name: 'Link NavLink组件',
      addr: 'home菜单(Home.js)',
     
    }, {
      key: '7',
      name: 'Link NavLink组件',
      addr: 'NotFount菜单 ',
     
    }];


    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <h1>React Router 4.x 例子</h1>
          <Table size="small" bordered={true} columns={columns} dataSource={data} />
        </Content>
      </Layout>
    );
  }
}

export default DefaultIndex;