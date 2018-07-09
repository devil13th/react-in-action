import React from 'react';
import { Layout,Collapse} from 'antd';
import { Link } from 'react-router-dom';

const Panel = Collapse.Panel;
const {Sider } = Layout;


class TaskSchedulingNav extends React.Component{

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
                    <Panel header="定时任务管理" key="0">
                    <p>
                        <Link to="/TaskScheduling/TaskSchedulingGroupManager">组管理</Link><br/>
                        <Link to="/TaskScheduling/TaskSchedulingTaskManager">任务管理</Link><br/>
                        <Link to="/TaskScheduling/TaskSchedulingTaskExecution">执行记录</Link><br/>
                    </p>
                    </Panel>
                    

                    
                    

                   

                </Collapse>            
            </Sider>
        )
    }
}

export { TaskSchedulingNav as TaskSchedulingNav};
