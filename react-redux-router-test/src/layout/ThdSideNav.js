import React from 'react';
import { Layout,Collapse} from 'antd';
import { Link } from 'react-router-dom';
const Panel = Collapse.Panel;
const {Sider } = Layout;


class ThdSideNav extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };

        this.onCollapse = this.onCollapse.bind(this);
    }
    
    onCollapse(collapsed){
        this.setState({ collapsed });
    } 

    render(){
        return (
            <Sider ref="sideNav"
                style={{borderRight:"1px solid #ddd",background:"#eee"}}
                
                breakpoint="lg"
                collapsedWidth={0}
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}>

                <Collapse accordion bordered={false}>
                    <Panel header="用户管理" key="0">
                    <p>
                        <Link to="/UserList">Home</Link>
                    </p>
                    </Panel>
                    <Panel header="基本控件" key="1">
                    <p>
                        <Link to="/Home">Home</Link>
                    </p>
                    </Panel>
                    <Panel header="容器控件" key="2">
                    <p>
                        <Link to="/About">About</Link>
                    </p>
                    </Panel>
                    <Panel header="模式控件" key="3">
                    <p>xxx</p>
                    </Panel>
                    <Panel header="Antd" key="4">
                    <p>
                        <Link to="/AntdTree">Antd Tree</Link>
                    </p>
                    </Panel>
                </Collapse>
            
            </Sider>
        )
    }
}

export default ThdSideNav;