import React from 'react';
import {uuid} from '../../../helper/index';
import {connect} from 'react-redux';
import {CommonComponent} from './CommonComponent'
//import {dragEvent,dropEvent} from '../componentUtil'
import  {
    createAddDragDesignerComponentAction,
    createRemoveRemoveDragDesignerComponentAction,
    createMoveDragDesignerComponentAction
} from '../action';
import {componentsMap} from '../dic';

class Tr extends CommonComponent{
    constructor(props){
        super(props);
        //console.log(this.props.data);
        //this.onDrop = this.onDrop.bind(this);
        //console.log("=======================");
        //console.log(this.mouseDragActive)
        this.onDrop = this.onDrop.bind(this);
    }

    static drawComponent = (componentCfg) => {
        console.log(' 开始绘制[Tr] ');
        if(componentCfg.childrens && componentCfg.childrens.length > 0){
            return (
                <TrComponent key={componentCfg.id} id={componentCfg.id} data={componentCfg}>
                    {componentCfg.childrens.map((item)=>{
                        let componentDic = componentsMap.get(item.componentId);
                        return componentDic.componentClass.drawComponent(item);
                    })}
                </TrComponent>
            );
        }else{
            return <TrComponent key={componentCfg.id} id={componentCfg.id} data={componentCfg}></TrComponent>;
        }
    }


    static createInstanceData = (cfg) => {
        console.log(' 创建[tr]实例数据 ',cfg);
        var id = uuid();
        return {           
            id:id,
            componentId:"Tr",
            key:id,
            cfg:{
                style:{
                    //width:400,
                    //height:400
                }
            },
            childrens:[],
            drag : true,
            drop : true
        }    
    }
    onDrop(e){
        console.log("onDrop");
        e.stopPropagation();
        const dragDomId = e.dataTransfer.getData("dragDomId");
        const targetDomId = e.target.getAttribute("id");

        


        if(componentsMap.get(dragDomId)){//拖动的是左侧菜单
            console.log("从菜单中拖入");
            const componentDic = componentsMap.get(dragDomId);
            const componentCfg = componentDic.componentClass.createInstanceData();
            this.props.addComponent(componentCfg,targetDomId);
        }else{//拖动的是设计区内已加入的组件
            console.log("从设计区中移动");
            if(dragDomId != targetDomId){
                this.props.moveComponent(dragDomId,targetDomId);
            }
        }

        this.mouseDragOverActive = false;
        this.mouseDragActive = false;
        this.setState({
            a:1
        })
      
        
    }

    render(){
        //console.log("------------"); 
        //console.log(this.props);
        const stl = {
            ...this.props.data.cfg.style,
            margin:"3px",
            border: this.mouseDragActive || this.mouseDragOverActive ? "1px dashed #000" : "1px dashed #aaa",
            padding:"5px"
        }


        const key = "div_" + uuid();
        return (
           
            <tr
                id={this.props.id}
            >
                {this.props.children}
            </tr>    
        )
    }
}

const mapStateToProps = (state,ownerProps) =>{
    return({
    })
}
 
const mapDispatchToProps = (dispatch,ownerProps) => {
    return({
        moveComponent : (dragDomId,targetDomId) => {
            dispatch(createMoveDragDesignerComponentAction(dragDomId,targetDomId));
        },
        addComponent : (dragComponentCfg,id) => {
            dispatch(createAddDragDesignerComponentAction(dragComponentCfg,id));
        }
    })
}

const TrComponent = connect(mapStateToProps,mapDispatchToProps)(Tr)

export {
    TrComponent as Tr
} ;
