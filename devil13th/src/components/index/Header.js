import React from 'react';
import { connect } from 'dva';
import { Layout, Affix,Menu, Icon } from 'antd';
import {Link } from 'dva/router';

const {Header : AntdHeader } = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            current : props.current
        }
    }

    handleClick = (e) => {
        console.log('click ', e);

        this.setState({
            current: e.key,
        });
    }


    render(){
        return (
            <AntdHeader style={{height:"auto",padding:0}}>
                <Affix offsetTop={this.props.top}>
                    <div className="logo" />
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="Index" title="首页">
                            <Link to="/"><Icon type="home" /> Index</Link>
                        </Menu.Item>
                        <Menu.Item key="Antd" title="Antd">
                            
                            <Link to="/antd"><Icon type="home" /> Antd</Link>
                        </Menu.Item>
                        
                        
                        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />React Example</span>}>
                            <Menu.Item key="setting:a">Option</Menu.Item>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="tool" />Basic</span>}>
                                <Menu.Item key="setting:0">Option 0</Menu.Item>
                                <MenuItemGroup title="Item 1">
                                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="Item 2">
                                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>

                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="tool" />Antd</span>}>
                                <MenuItemGroup title="Item 1">
                                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="Item 2">
                                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                            
                            <MenuItemGroup title="Item 2">
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                        <Menu.Item key="alipay">
                            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                        </Menu.Item>
                    </Menu>
                </Affix>
            </AntdHeader>
        )
    }
}

export default Header;
            