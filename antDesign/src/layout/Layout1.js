import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class Layout1 extends React.Component{
    constructor(props ){
        super(props);
    }
    render(){
        return (
            <div>
           

            <Layout>
              <Header>Header</Header>
              <Layout>
                <Sider>Sider</Sider>
                <Content>
                  <Link to="/Layout1">Layout1</Link><br/>
                  <Link to="/Layout2">Layout2</Link><br/>
                  <Link to="/Layout3">Layout3</Link>
                  <Link to="/Layout4">Layout4</Link>
                </Content>
              </Layout>
              <Footer>Footer</Footer>
            </Layout>
        
            <Layout>
              <Header>Header</Header>
              <Layout>
                <Content>Content</Content>
                <Sider>Sider</Sider>
              </Layout>
              <Footer>Footer</Footer>
            </Layout>
        
            <Layout>
              <Sider>Sider</Sider>
              <Layout>
                <Header>Header</Header>
                <Content>
                  <Link to="/Layout1">Layout1</Link>
                  <Link to="/Layout2">Layout2</Link>
                  <Link to="/Layout3">Layout3</Link>
                </Content>
                <Footer>Footer</Footer>
              </Layout>
            </Layout>
            
          </div>
        );
    }
}



export {Layout1 as Layout1};