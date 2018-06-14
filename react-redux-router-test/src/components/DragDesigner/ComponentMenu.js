import React from 'react';
import { Layout,Collapse,Button } from 'antd';
import {connect} from 'react-redux';
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

        this.showViewData = this.showViewData.bind(this);
    }


    showViewData(){
        this.props.showModal();
    }

    render(){
        return(
            <Sider style={{height:"100%",background:'#fff',border:"1px solid #ddd",borderRight:"1px solid #666"}}>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本控件" key="1">
                        {this.state.baseComponents.map(item => {
                            return (
                                <ComponentMenuItem id={item.id} key={item.id} componentData={item}></ComponentMenuItem>
                            )
                        })}
                    </Panel>
                    <Panel header="容器" key="2">
                        {this.state.containers.map(item => {
                            return (
                                <ComponentMenuItem id={item.id} key={item.id} componentData={item}></ComponentMenuItem>
                            )
                        })}
                    </Panel>
                    <Panel header="模式控件" key="3">
                        xxx
                    </Panel>
                    <Panel header="数据显示" key="4">
                        <Button type="primary" onClick={this.showViewData}>Primary</Button>
                    </Panel>
                </Collapse>
            </Sider>
        )
    }
}


const mapStateToProps = (state,ownerProps) =>{
    return({
        
    })
}
 
const mapDispatchToProps = (dispatch,ownerProps) => {
    return({
        showModal : () => {
            dispatch({type:"SHOW_MODAL",value:true});
        }
    })
}

const ComponentMenuComponent = connect(mapStateToProps,mapDispatchToProps)(ComponentMenu)

export {ComponentMenuComponent as ComponentMenu}