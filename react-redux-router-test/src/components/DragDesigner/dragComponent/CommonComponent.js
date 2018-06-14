import React from 'react';

class CommonComponent extends React.Component{
    constructor(props){
        super(props);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);


        this.onDrop = this.onDrop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
      
    }
    
    mouseDragActive = false;
    mouseDragOverActive = false;

    onDragEnter(e){
        console.log("onDragEnter");
        e.preventDefault();
        e.stopPropagation();
        console.log(this);
        this.mouseDragOverActive = true;
        this.mouseDragActive = true;
        this.setState({
            a:1
        })

        
        //$(this).addClass("drogHover");
    }
    onDragLeave(e){
        console.log("onDragLeave");
        e.preventDefault(); 
        e.stopPropagation();
        this.mouseDragOverActive = false;
        this.mouseDragActive = false;
        this.setState({
            a:1
        })
        
        //$(this).removeClass("drogHover");
    }
    onDragOver(e){
        console.log("onDragOver");
        e.preventDefault();
        e.stopPropagation();
        this.mouseDragOverActive = true;
        this.mouseDragActive = true;
        this.setState({
            a:1
        })
    }

    onDragStart(e){
        console.log("onDragStart");
        e.stopPropagation();
        //e.dataTransfer.setData("dragObjId",this.id);
        e.dataTransfer.setData("dragDomId",e.target.getAttribute("id"));
        //console.log("开始拖动[" + this.id + "]" + "(" + this.outerHTML + ")");
        //console.log($(this));
        //$(this).addClass("dragHover");
        this.mouseDragOverActive = true;
        this.mouseDragActive = true;
        this.setState({
            a:1
        })
    }

    onDragEnd(e){  
        console.log("onDragEnd");
        //e.dataTransfer.setData("dragDomId",e.target.id);
        //console.log("结束拖动[" + this.id + "]");
        //$(this).removeClass("dragHover");
        this.mouseDragOverActive = false;
        this.mouseDragActive = false;
        this.setState({
            a:1
        })
    }

    onDrop(e){
        console.log("onDrop");
        e.stopPropagation();
        const dragDomId = e.dataTransfer.getData("dragDomId");
        const targetDomId = e.target.getAttribute("id");

        if(dragDomId != targetDomId){
            this.props.moveComponent(dragDomId,targetDomId);
        }
        this.mouseDragOverActive = false;
        this.mouseDragActive = false;
        this.setState({
            a:1
        })
    }

}

export {CommonComponent as CommonComponent}