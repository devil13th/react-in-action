import React from 'react';
import { connect } from 'dva';
import { Layout, Affix,Menu, Icon } from 'antd';
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
                        <Menu.Item key="mail">
                            <Icon type="mail" />Navigation One
                        </Menu.Item>
                        

                        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
                            <MenuItemGroup title="Item 1">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
                                    <MenuItemGroup title="Item 1">
                                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                                    </MenuItemGroup>
                                    <MenuItemGroup title="Item 2">
                                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                                    </MenuItemGroup>
                                </SubMenu>
                            </MenuItemGroup>
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
            