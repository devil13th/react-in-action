import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';



import { routerRedux, Route,Link } from 'dva/router';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;




class AppRouter extends React.Component {
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
                    
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /> DVA例子</span>}
                        >
                            <Menu.Item key="31"><Link to='/'>Index</Link></Menu.Item>
                            <Menu.Item key="3"><Link to='/list'>TODO LIST EXAMPLE</Link></Menu.Item>
                            <Menu.Item key="4"><Link to='/test'>Test</Link></Menu.Item>
                            <Menu.Item key="5"><Link to='/sysUser'>用户管理 CRUD 例子</Link></Menu.Item>
                        </SubMenu>

                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        
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
                            <div>
                               
                                aaaaaaa
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


AppRouter.propTypes = {
};

export default connect()(AppRouter);
