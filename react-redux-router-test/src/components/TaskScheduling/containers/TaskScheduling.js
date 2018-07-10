import React from 'react';
import {connect} from 'react-redux';
import { Layout,Collapse} from 'antd';
import {TaskSchedulingNav} from './TaskSchedulingNav'
import {TaskSchedulingGroupManager} from './TaskSchedulingGroupManager'
import {TaskSchedulingTaskManager} from './TaskSchedulingTaskManager'
import {TaskSchedulingTaskExecution} from './TaskSchedulingTaskExecution'


import {Route,Switch} from 'react-router-dom'
const {  Sider, Content } = Layout;
class TaskScheduling extends React.Component{
    render(){
        return (
            <Layout style={{background:"#fff",height:"100%"}}>
                <TaskSchedulingNav></TaskSchedulingNav>
                <Content style={{padding:"15px 46px"}}>
                    <Switch>
                        <Route exact path="/TaskScheduling" name="TaskSchedulingTaskManager" component={TaskSchedulingTaskManager} ></Route>
                        <Route path="/TaskScheduling/TaskSchedulingGroupManager" name="TaskSchedulingGroupManager" component={TaskSchedulingGroupManager} ></Route>
                        <Route path="/TaskScheduling/TaskSchedulingTaskManager" name="TaskSchedulingTaskManager" component={TaskSchedulingTaskManager} ></Route>
                        <Route path="/TaskScheduling/TaskSchedulingTaskExecution" name="TaskSchedulingTaskExecution" component={TaskSchedulingTaskExecution} ></Route>
                        
                    </Switch>
                </Content>
            </Layout>
        )
    }

}


const mapStateToProps = (state,ownProps) => {
    const moduleState = state.formManagerReducer;
    return{
      
    }
}

const dispatchToProps = (dispatch,ownProps) => {
    return{
        
        
    }
}

const TaskSchedulingContainer = connect(mapStateToProps,dispatchToProps)(TaskScheduling);
export {TaskSchedulingContainer as TaskScheduling}

