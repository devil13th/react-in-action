import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { HashRouter, Redirect, BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import NotFound from './NotFound'
import Home from './Home.js';
import About from './About.js';
import DefaultIndex from './DefaultIndex'
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Param from './Param';
import '../antd.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


console.log(React);
console.log(ReactDOM);



class App extends Component {
    render() {
        return (
            <HashRouter>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >

                            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/about">about</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/home">home >></Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/param/devil13th">Param</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/xx">not found</Link></Menu.Item>

                        </Menu>
                    </Header>
                    <Layout>
                    
                        
                            
                            <Switch>
                                <Route exact path='/' component={DefaultIndex} />
                                <Route path='/about' component={About} />
                                <Route path='/home' component={Home} />
                                <Route path="/param/:userId" component={Param} />

                                <Route path='/NotFound' component={NotFound} />
                                <Redirect to='/NotFound' />
                            </Switch>
                        
                        
                    </Layout>
                </Layout>

            </HashRouter>
      );
    }
}


ReactDOM.render((
    <App />

), document.getElementById('root'));
