import React from 'react';
import { Layout,Collapse } from 'antd';

import {
    DicComponentType as DicComponentType,
    DicComponents as DicComponents
} from './dic'
import {ComponentMenuItem} from './ComponentMenuItem';
const Panel = Collapse.Panel;
const {  Sider  } = Layout;
import {drawComponent} from './componentUtil'

class ComponentMenu extends React.Component{
    constructor(props){
        super(props);

        this.state={
            baseComponents:[],
            containers:[],
            patternComponents:[]
        }
        Object.values(DicComponents.baseComponents).forEach(item => {
            this.state.baseComponents.push(item);
        })

        Object.values(DicComponents.containers).forEach(item => {
            this.state.containers.push(item);
        })
    }
    render(){
        return(
            <Sider style={{height:"100%",background:'#fff'}}>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本控件" key="1">
                        {this.state.baseComponents.map(item => {
                            return (
                                <ComponentMenuItem key={item.id} componentData={item}></ComponentMenuItem>
                            )
                        })}
                    </Panel>
                    <Panel header="容器" key="2">
                        {this.state.containers.map(item => {
                            return (
                                <ComponentMenuItem key={item.id} componentData={item}></ComponentMenuItem>
                            )
                        })}
                    </Panel>
                    <Panel header="模式控件" key="3">
                        xxx
                    </Panel>
                </Collapse>
            </Sider>
        )
    }
}

export {ComponentMenu as ComponentMenu}