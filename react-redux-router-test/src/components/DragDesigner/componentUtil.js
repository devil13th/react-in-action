import componentsMap from './dic';
function createFaceDom(componentObj){
    
}


const dragEvent = {
    onDragEnter : function(e){
        console.log("onDragEnter");
        e.preventDefault();
        e.stopPropagation();
        //$(this).addClass("drogHover");
    },
    onDragLeave : function(e){
        console.log("onDragLeave");
        e.preventDefault(); 
        e.stopPropagation();
        //$(this).removeClass("drogHover");
    },
    onDragOver : function(e){
        console.log("onDragOver");
        e.preventDefault();
        e.stopPropagation();
        //$(this).addClass("drogHover");
    },
    onDrop : function(e){
        console.log("onDrop");
        e.preventDefault();
        e.stopPropagation();
        //$(this).removeClass("drogHover");
    },
    onDragStart : function(e){
        console.log("onDragStart");
        e.stopPropagation();
        //e.dataTransfer.setData("dragObjId",this.id);
        e.dataTransfer.setData("dragDomId",e.target.getAttribute("id"));
        //console.log("开始拖动[" + this.id + "]" + "(" + this.outerHTML + ")");
        //console.log($(this));
        //$(this).addClass("dragHover");
    },
    onDragEnd : function(e){  
        console.log("onDragEnd");
        //e.dataTransfer.setData("dragDomId",e.target.id);
        //console.log("结束拖动[" + this.id + "]");
        //$(this).removeClass("dragHover");
    },
    onDrop : function(e){
        console.log("onDrop");
        e.stopPropagation();
        const dragDomId = e.dataTransfer.getData("dragDomId");
        const targetDomId = e.target.getAttribute("id")
        console.log(dragDomId,targetDomId);
    }

}

export {
    dragEvent
}