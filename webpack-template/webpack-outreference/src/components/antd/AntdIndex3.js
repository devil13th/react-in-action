import React from 'react';
import { Layout,Menu,Breadcrumb,Icon} from 'antd';

import img from "../../imgs/yay.jpg";
const {Content:AntdContent,Sider} = Layout;


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;




class AntdIndex extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <h1>Antd...!!!</h1>
        )
    }
}

export default AntdIndex;