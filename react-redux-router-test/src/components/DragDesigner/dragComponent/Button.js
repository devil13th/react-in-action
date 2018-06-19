import React from 'react';
import { Button } from 'antd';
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

class VHButton extends CommonComponent{
    constructor(props){
        super(props);
        //console.log(this.props.data);
        //this.onDrop = this.onDrop.bind(this);
        //console.log("=======================");
        //console.log(this.mouseDragActive)
    }

    static drawComponent = (componentCfg) => {
        console.log(' 开始绘制[button] ',componentCfg);
       
        return (
            <ButtonComponent 
                key={componentCfg.id} 
                id={componentCfg.id} 
                data={componentCfg} 
            >
            </ButtonComponent>
        );
    }

    static createInstanceData = (cfg) => {
        console.log(' 创建[button]实例数据 ',cfg);

        var id = uuid();

        if(cfg){
            return {
                id:id,
                componentId:"Button",
                key:id,
                cfg:{
                    style:{
                        
                    },
                    value: cfg.value || "按钮"
                },
                drag : true,
                drop : false
            } 
        }else{
            return {           
                id:id,
                componentId:"Button",            
                key:id,
                cfg:{
                    style:{
                       
                    },
                    value:"按钮"
                },
                drag : true,
                drop : false
            } 
        }
               
    }

    onClick = () =>{
        alert(1)
    }

    render(){

        console.log("------------"); 
        console.log(this.props);
        const stl = {
            ...this.props.data.cfg.style,
            display:"inline-block",
            border: this.mouseDragActive || this.mouseDragOverActive ? "1px dashed #000" : "0px dashed #aaa",
        }


        const key = "button_" + uuid();
        //console.log("-----------");
        //console.log(this.props);
        return (
            <div 
                draggable={this.props.data.drag}
                onDragStart = {this.props.data.drag ? this.onDragStart : null}
                onDrag = {this.props.data.drag ? this.onDrag : null}
                onDragEnd = {this.props.data.drag ? this.onDragEnd : null}

                onDragEnter = {this.props.data.drop ? this.onDragEnter : null}

                onDragOver = {this.props.data.drop ? this.onDragOver : null}
                onDragLeave = {this.props.data.drop ? this.onDragLeave : null}
                onDrop = {this.props.data.drop ? this.onDrop : null}
                
                style={stl}
                id={this.props.id}

                
            >
                <Button onClick={this.onClick}>
                    {this.props.data.cfg.value}
                </Button>    
            </div>
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
         }
     })
 }
 
const ButtonComponent = connect(mapStateToProps,mapDispatchToProps)(VHButton)

export {
    ButtonComponent as Button
} ;
