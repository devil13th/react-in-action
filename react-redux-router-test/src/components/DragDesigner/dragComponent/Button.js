import React from 'react';
import { Button } from 'antd';
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

class VHButton extends CommonComponent{
    constructor(props){
        super(props);
        //console.log(this.props.data);
        //this.onDrop = this.onDrop.bind(this);
        //console.log("=======================");
        //console.log(this.mouseDragActive)
    }


    render(){

       
        const stl = {
            display:"inline-block",
            border: this.mouseDragActive || this.mouseDragOverActive ? "1px dashed #000" : "0px dashed #aaa",
        }


        const key = "button_" + uuid();
        return (
            <div 
                draggable={true}
                onDragStart = {this.onDragStart}
                onDrag = {this.onDrag}
                onDragEnd = {this.onDragEnd}
                style={stl}
                id={this.props.id}
            >
                <Button>
                    按钮
                </Button>    
            </div>
        )
    }
}

const drawComponent = (componentCfg) => {
    console.log(' 开始绘制[button] ');
    
    return (
        <ButtonComponent key={componentCfg.id} id={componentCfg.id} data={componentCfg}>
        </ButtonComponent>
    );
   
    
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
    ButtonComponent as Button,
    drawComponent as drawComponent
} ;
