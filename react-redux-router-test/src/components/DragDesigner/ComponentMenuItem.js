import React from 'react';
import { Icon } from 'antd';


class ComponentMenuItem extends React.Component{
    constructor(props){
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragStart(e){
        console.log("开始拖动[" + this.props.componentData.id + "]");
        e.dataTransfer.setData("dragDomId",this.props.componentData.id);
    }
    
    render(){
        const componentData = this.props.componentData ;
        //const id = "componentMenuItem_" + componentData.id;
        const id =  this.props.id;
        return(
            <div 
                draggable="true" 
                style={{textAlign:"left",margin:"1px",cursor:"move",border:"1px solid #ccc",borderRadius:"2px",padding:"2px 5px 2px 2px"}} 
                data-componentdata={componentData} 
                key={id}
                id={id}
                onDragStart={this.onDragStart}
            >
                <Icon type="tag-o" style={{marginRight:"1em"}}/>
                {componentData.name}
            </div>
        )
    }
}

export {ComponentMenuItem as ComponentMenuItem}