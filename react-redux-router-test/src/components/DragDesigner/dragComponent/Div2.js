import React from 'react';
import {uuid} from '../../../helper';
import {connect} from 'react-redux';
import {CommonComponent} from './CommonComponent'
//import {dragEvent,dropEvent} from '../componentUtil'
import  {
    createAddDragDesignerComponentAction,
    createRemoveRemoveDragDesignerComponentAction,
    createMoveDragDesignerComponentAction
} from '../action';
import {componentsMap} from '../dic';

class Div2 extends CommonComponent{
    constructor(props){
        super(props);
        //console.log(this.props.data);
        //this.onDrop = this.onDrop.bind(this);
        //console.log("=======================");
        //console.log(this.mouseDragActive)
        this.onDrop = this.onDrop.bind(this);
    }

    

    onDrop(e){
        console.log("onDrop");
        e.stopPropagation();
        const dragDomId = e.dataTransfer.getData("dragDomId");
        const targetDomId = e.target.getAttribute("id");
        if(componentsMap.get(dragDomId)){//拖动的是左侧菜单
            console.log("从菜单中拖入");
            const componentDic = componentsMap.get(dragDomId);
            const componentCfg = {
                id : componentDic.id + "_" + uuid(),//html的id
                componentId : componentDic.id,//组件id
                cfg:{}, //其他配置
                key: componentDic.id + "_" + uuid(),
                childrens:[
                ],
                isAddComponent:true //是新增组件还是移动组件(是否是从左侧菜单拖入的)
            }
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

       
        const stl = {
            margin:"3px",
            border: this.mouseDragActive || this.mouseDragOverActive ? "1px dashed #000" : "1px dashed #aaa",
            padding:"5px"
        }


        const key = "div_" + uuid();
        return (
           
            <div  
                draggable={true}
                onDragStart = {this.onDragStart}
                onDrag = {this.onDrag}
                onDragEnd = {this.onDragEnd}

                onDragEnter = {this.onDragEnter}
                onDragOver = {this.onDragOver}
                onDragLeave = {this.onDragLeave}
                onDrop = {this.onDrop}

                className="drogHover"
                
                style={stl}
                id={this.props.id}
            >
                2{this.props.children}
            </div>    
        )
    }
}

const drawComponent = (componentCfg) => {
    console.log(' 开始绘制[div] ');
    if(componentCfg.childrens && componentCfg.childrens.length > 0){
        return (
            <DivComponent key={componentCfg.id} id={componentCfg.id} data={componentCfg}>
                {componentCfg.childrens.map((item)=>{
                    let componentDic = componentsMap.get(item.componentId);
                    return componentDic.drawMethod(item);
                })}
            </DivComponent>
        );
    }else{
        return <DivComponent key={componentCfg.id} id={componentCfg.id} data={componentCfg}></DivComponent>;
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

const DivComponent = connect(mapStateToProps,mapDispatchToProps)(Div2)

export {
    DivComponent as Div2,
    drawComponent as drawComponent
} ;
