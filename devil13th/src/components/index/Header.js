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
                        
                        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />dva Example</span>}>
                            <Menu.Item key="SysUser">
                                <Link to="/SysUserRouter"><Icon type="user" /> User Manage </Link>
                            </Menu.Item>
                            <Menu.Item key="SysDicPub">
                                <Link to="/SysDicPubRouter"><Icon type="user" /> Pub Dic Manage </Link>
                            </Menu.Item>
                            <Menu.Item key="SysDicPubClassify">
                                <Link to="/SysDicPubClassifyRouter"><Icon type="user" /> Pub Dic Classify Manage </Link>
                            </Menu.Item> 
                            <Menu.Item key="NoteClassifyRouter">
                                <Link to="/NoteClassifyRouter"><Icon type="user" /> Note Classify </Link> 
                            </Menu.Item>
                            <Menu.Item key="NoteListRouter">
                                <Link to="/NoteListRouter"><Icon type="user" /> Note List </Link> 
                            </Menu.Item>
                            <Menu.Item key="ReactCodegenTest">
                                <Link to="/ReactCodegenTestRouter"><Icon type="user" />  ReactCodeGenTest </Link>
                            </Menu.Item>
                            <Menu.Item key="ModNoteList">
                                <Link to="/note/ModNoteListRouter"><Icon type="user" />  记事 </Link>
                            </Menu.Item>
                        </SubMenu>

                        
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
                            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Antd </a>
                        </Menu.Item>
                    </Menu>
            </AntdHeader>
        )
    }
}

export default Header;
            