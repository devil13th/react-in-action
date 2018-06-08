import React from 'react';
import {Layout } from 'antd';
import {ComponentMenu} from './ComponentMenu';
import {DesignArea} from './DesignArea';
const { Header, Footer, Sider, Content  } = Layout;

class DragDesigner extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{height:"100%"}}>
                <Layout style={{height:"100%"}}>
                    <ComponentMenu style={{height:"100%"}}>Sider</ComponentMenu>
                    <DesignArea></DesignArea>
                </Layout>
            </div>
        )
    }
}

export {DragDesigner as DragDesigner}