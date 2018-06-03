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
                        <Link to="/AntdTreeForHtml">Antd Tree Html</Link>
                    </p>
                    <p>
                        <Link to="/AntdTreeForData">Antd Tree Data</Link>
                    </p>
                    <p>
                        <Link to="/MyLayout">MyLayout</Link>
                    </p>
                    <p>
                        <Link to="/AntdTable">AntdTable</Link>
                    </p>
                    <p>
                     <Link to="/EditTable">EditTable</Link>
                    </p>
                    <p>
                        <Link to="/AntdForm">AntdForm</Link>
                    </p>
                    </Panel>
                    <Panel header="数据视图" key="5">
                    <p>
                        <Link to="/DataViewLayout">DataViewLayout</Link>
                    </p>
                    </Panel>
                    <Panel header="生命周期" key="6">
                    <p>
                        <Link to="/LifecycleExample">LifecycleExample</Link>
                    </p>
                    </Panel>
                </Collapse>
            
            </Sider>
        )
    }
}

export default ThdSideNav;
