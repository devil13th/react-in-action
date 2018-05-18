import React from 'react';
import { Layout } from 'antd';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header } = Layout;




class ThdHeader extends React.Component{
    
    

    constructor(props){
        super(props);
        this.state = {
            current: 'mail',
        }
    } 
    
    handleClick(e){
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
   


    render(){
        

        const logoStl = {
            width: "240px",
            height: "46px",
            lineHeight:"46px",
            background: "rgba(255,255,255,.2)",  
            paddingLeft:"2em",
            fontSize:"1.5em",
            fontWeight:"bold",
            float: "left"
        }


        return (
            <Header style={{borderBottom:"1px solid #ddd ",margin:"0px",background:"#eee",padding:"0px",height:"48px"}}>
                <div style={logoStl}>Form Designer</div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="mail">
                        <Icon type="save" />保存
                    </Menu.Item>


                    <SubMenu title={<span><Icon type="setting" />Submenu</span>}>
                        <MenuItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>

                            <SubMenu title={<span><Icon type="setting" />Submenu</span>}>
                                <MenuItemGroup title="Item 1">
                                    <Menu.Item key="setting:1">Option 1</Menu.Item>

                                    <SubMenu title={<span><Icon type="setting" />Submenu</span>}>
                                        <MenuItemGroup title="Item 1">
                                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                                        </MenuItemGroup>
                                        <MenuItemGroup title="Item 2">
                                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                                        </MenuItemGroup>
                                    </SubMenu>

                                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="Item 2">
                                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>


                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>



                    
                   
                </Menu>
            </Header>
        )
    }
}

export default ThdHeader;
