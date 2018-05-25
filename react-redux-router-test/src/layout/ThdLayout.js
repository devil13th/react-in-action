import React from 'react';
import ThdHeader from './ThdHeader';
import ThdFooter from './ThdFooter';
import ThdSideNav from './ThdSideNav';
import { Layout,Collapse } from 'antd';
import {Route,Switch} from 'react-router-dom'
import Home from '../components/Home';
import About from '../components/About';
import UserList from '../components/UserManager/UserList';
import {AntdTreeForHtml,AntdTreeForData} from '../components/AntdTree/components'
import {MyLayout} from '../components/Layout/components';
import {AntdTable} from '../components/AntdTable/components'
const Panel = Collapse.Panel;
const {  Sider, Content } = Layout;




class ThdLayout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    
    render(){
        return(
            <Layout style={{background:"#fff",height:"100%"}}>
                <ThdHeader></ThdHeader>
                <Layout>
                    <ThdSideNav></ThdSideNav>
                    <Content style={{padding:"15px 46px"}}>
                        <Switch>
                            <Route exact path="/" name="idx" component={Home} ></Route>
                            <Route path="/Home" name="home" component={Home} ></Route>
                            <Route path="/About" name="about" component={About} ></Route>
                            <Route path="/UserList" name="about" component={UserList} ></Route>
                            <Route path="/AntdTreeForHtml" name="antdTree" component={AntdTreeForHtml} ></Route>
                            <Route path="/AntdTreeForData" name="antdTree" component={AntdTreeForData} ></Route>
                            <Route path="/MyLayout" name="MyLayout" component={MyLayout} ></Route>
                            <Route path="/AntdTable" name="AntdTable" component={AntdTable} ></Route>
                            
                        </Switch>
                    </Content>
                </Layout>
                <ThdFooter></ThdFooter>
            </Layout>
        )
    }
}

export default ThdLayout;
