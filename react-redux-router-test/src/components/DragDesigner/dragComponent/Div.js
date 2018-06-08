import React from 'react';
import {uuid} from '../../../helper';
import {connect} from 'react-redux';
import {dragEvent,dropEvent} from '../componentUtil'
import  {
    createAddDragDesignerComponentAction,
    createRemoveRemoveDragDesignerComponentAction,
    createMoveRemoveDragDesignerComponentAction
} from '../action';

class Div extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props.data);
        this.onDrop = this.onDrop.bind(this);
        //console.log("=======================");
        //console.log(props.moveComponent)
    }

    
    onDrop(e){
        console.log("onDrop");
        e.stopPropagation();
        const dragDomId = e.dataTransfer.getData("dragDomId");
        const targetDomId = e.target.getAttribute("id")
        
        this.props.moveComponent(dragDomId,targetDomId);
        
    }

    render(){
        const stl = {
            margin:"3px",
            border:"1px dashed #aaa",
            padding:"5px"
        }
        const key = "div_" + uuid();
        return (
           
            <div  
                draggable={true}
                onDragStart = {dragEvent.onDragStart}
                onDrag = {dragEvent.onDrag}
                onDragEnd = {dragEvent.onDragEnd}

                onDragEnter = {dragEvent.onDragEnter}
                onDragOver = {dragEvent.onDragOver}
                onDragLeave = {dragEvent.onDragLeave}
                onDrop = {this.onDrop}

                style={stl}
                id={this.props.id}
            >
                {this.props.children}
            </div>    
        )
    }
}

const drawComponent = (componentCfg) => {
    console.log(' 开始绘制[div] ');
    return <DivComponent key={componentCfg.id} id={componentCfg.id} data={componentCfg}></DivComponent>;
}

const mapStateToProps = (state,ownerProps) =>{
    return({
    })
 }
 
 const mapDispatchToProps = (dispatch,ownerProps) => {
     return({
         moveComponent : (dragDomId,targetDomId) => {
             dispatch(createMoveRemoveDragDesignerComponentAction(dragDomId,targetDomId));
         }
     })
 }
 
const DivComponent = connect(mapStateToProps,mapDispatchToProps)(Div)

export {
    DivComponent as Div,
    drawComponent as drawComponent
} ;
