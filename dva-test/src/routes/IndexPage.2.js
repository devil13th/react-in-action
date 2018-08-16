import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import styles from './IndexPage.css';


import List from '../routes/List';
import Test from '../routes/Test';
import SysUserRouter from '../routes/SysUserRouter';


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;




class IndexPage extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>User</span></span>}
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>Team</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>

                    <Content style={{ margin: '0 8px' }}>
                        <Breadcrumb style={{ margin: '8px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                            <div className={styles.normal}>
                                <h1 className={styles.title}>Yay! Welcome to dva!</h1>
                                <div className={styles.welcome} />
                                <ul className={styles.list}>
                                    <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
                                    <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
                                    <li><a href="/#/list">[ TODO LIST EXAMPLE ]</a> </li>
                                    <li><a href="/#/test">[ Test ]</a> </li>
                                    <li><a href="/#/sysUser">[ 用户管理 CRUD 例子 ]</a> </li>
                                </ul>
                            </div>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
</Footer>
                </Layout>
            </Layout>
        );
    }
}


IndexPage.propTypes = {
};

export default connect()(IndexPage);
