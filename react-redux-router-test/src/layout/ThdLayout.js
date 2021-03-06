import React from 'react';
import ThdHeader from './ThdHeader';
import ThdFooter from './ThdFooter';
import ThdSideNav from './ThdSideNav';
import { Layout,Collapse } from 'antd';
import {Route,Switch} from 'react-router-dom'
import Home from '../components/Home';
import About from '../components/About';
import UserList from '../components/UserManager/UserList';
import {AntdTreeForHtml,AntdTreeForData} from '../components/AntdTree/components'
import {MyLayout} from '../components/Layout/components';
import {AntdTable} from '../components/AntdTable/components'
import {AntdForm} from '../components/AntdForm/components'
import {FormInitExample} from '../components/AntdForm/FormInitExample'
import EditTable from '../components/AntdTable/EditTable'
//import {DataViewLayout} from '../components/DataView'
import {DataViewLayout} from '../components/DataView/components/DataViewLayout'
import {LifecycleExample} from '../components/LifecycleExample'
import {AdvanceComponent} from '../components/AdvanceCompent'
import {DragDesigner} from '../components/DragDesigner'
import {FormManager} from '../components/FormManager/containers/FormManager'
import {TaskScheduling} from '../components/TaskScheduling/containers/TaskScheduling'
import {TaskSchedulingGroupManager} from '../components/TaskScheduling/containers/TaskSchedulingGroupManager'
import {TaskSchedulingTaskExecution} from '../components/TaskScheduling/containers/TaskSchedulingTaskExecution'
import {TaskSchedulingTaskManager} from '../components/TaskScheduling/containers/TaskSchedulingTaskManager'


const Panel = Collapse.Panel;
const {  Sider, Content } = Layout;




class ThdLayout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    
    render(){
        return(
            <Layout style={{background:"#fff",height:"100%"}}>
                <ThdHeader></ThdHeader>
                <Layout>
                    <ThdSideNav></ThdSideNav>
                    <Content style={{padding:"15px 46px"}}>
                        <Switch>
                            <Route exact path="/" name="idx" component={Home} ></Route>
                            <Route path="/Home" name="home" component={Home} ></Route>
                            <Route path="/About" name="about" component={About} ></Route>
                            <Route path="/UserList" name="about" component={UserList} ></Route>
                            <Route path="/AntdTreeForHtml" name="antdTree" component={AntdTreeForHtml} ></Route>
                            <Route path="/AntdTreeForData" name="antdTree" component={AntdTreeForData} ></Route>
                            <Route path="/MyLayout" name="MyLayout" component={MyLayout} ></Route>
                            <Route path="/AntdTable" name="AntdTable" component={AntdTable} ></Route>
                            <Route path="/EditTable" name="EditTable" component={EditTable} ></Route>
                            <Route path="/AntdForm" name="AntdForm" component={AntdForm} ></Route>
                            <Route path="/FormInitExample" name="FormInitExample" component={FormInitExample} ></Route>
                            
                            <Route path="/DataViewLayout" name="DataViewLayout" component={DataViewLayout} ></Route>
                            <Route path="/LifecycleExample" name="LifecycleExample" component={LifecycleExample} ></Route>
                            
                            <Route path="/AdvanceComponent" name="AdvanceComponent" component={AdvanceComponent} ></Route>

                            <Route path="/DragDesigner" name="DragDesigner" component={DragDesigner} ></Route>
                            <Route path="/FormManager" name="FormManager" component={FormManager} ></Route>
                            
                            <Route path="/TaskScheduling" name="TaskScheduling" component={TaskScheduling} ></Route>
                            <Route path="/s" name="TaskSchedulingTaskExecution" component={TaskSchedulingTaskExecution} ></Route>
                            
                            <Route path="/TaskSchedulingGroupManager" name="TaskSchedulingGroupManager" component={TaskSchedulingGroupManager} ></Route>
                            <Route path="/TaskSchedulingTaskManager" name="TaskSchedulingTaskManager" component={TaskSchedulingTaskManager} ></Route>
                            <Route path="/TaskSchedulingTaskExecution" name="TaskSchedulingTaskExecution" component={TaskSchedulingTaskExecution} ></Route>
                        </Switch>
                    </Content>
                </Layout>
                <ThdFooter></ThdFooter>
            </Layout>
        )
    }
}

export default ThdLayout;
