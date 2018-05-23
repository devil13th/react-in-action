import React from 'react';
import { Layout,Divider } from 'antd';
import MyForm from './MyForm';
import TransferTree from './TransferTree';
const { Header, Footer, Sider, Content } = Layout;


class MyLayout extends React.Component{
    
    constructor(props){
        super(props);
    }


    render(){
        return(
            <Layout style={{height:"100%"}}>
                <Header style={{background:"#fff",padding:"0px",height:"auto"}}>
                <Divider orientation="left">基本信息</Divider>
                    <MyForm></MyForm>
                </Header>
                <Content  style={{background:"#fff"}}>
                   
                    <Divider orientation="left">数据集信息</Divider>
                    
                    <TransferTree></TransferTree>
                </Content>
               
            </Layout>
        )
    }
}




export {MyLayout as MyLayout} ;