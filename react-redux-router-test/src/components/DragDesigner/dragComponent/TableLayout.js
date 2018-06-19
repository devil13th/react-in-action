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

class TableLayout extends CommonComponent{
    constructor(props){
        super(props);
        //console.log(this.props.data);
        //this.onDrop = this.onDrop.bind(this);
        //console.log("=======================");
        //console.log(this.mouseDragActive)
        this.onDrop = this.onDrop.bind(this);
    }

    static drawComponent = (componentCfg) => {
        console.log(' 开始绘制[TableLayout] ');
        if(componentCfg.childrens && componentCfg.childrens.length > 0){
            return (
                <TableLayoutComponent key={componentCfg.id} id={componentCfg.id} data={componentCfg}>
                    {componentCfg.childrens.map((item)=>{
                        let componentDic = componentsMap.get(item.componentId);
                        return componentDic.componentClass.drawComponent(item);
                    })}
                </TableLayoutComponent>
            );
        }else{
            return <TableLayoutComponent key={componentCfg.id} id={componentCfg.id} data={componentCfg}></TableLayoutComponent>;
        }
    }

    static drawSetting = () => {
        
    }


    static createInstanceData = (cfg) => {
        console.log(' 创建[TableLayout]实例数据 ',cfg);
        var id = "TableLayout_" + uuid();
        var tbodyId = "Tbody_" + uuid();
        return {           
            id:id,
            componentId:"TableLayout",
            key:id,
            cfg:{
                style:{
                    width:"100%"
                }
            },
            childrens:[
                {           
                    id:"Tbody_" + uuid(),
                    componentId:"Tbody",
                    key:tbodyId,
                    cfg:{
                        style:{
                            //width:400,
                            //height:400
                        }
                    },
                    childrens:[
                        {           
                            id:"Tr_" + uuid(),
                            componentId:"Tr",
                            key:"Tr_" + uuid(),
                            cfg:{
                                style:{
                                    //width:400,
                                    //height:400
                                }
                            },
                            childrens:[
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                } ,
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                },
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                } 
                            ],
                            drag : false,
                            drop : false
                        },
                        {           
                            id:"Tr_" + uuid(),
                            componentId:"Tr",
                            key:"Tr_" + uuid(),
                            cfg:{
                                style:{
                                    //width:400,
                                    //height:400
                                }
                            },
                            childrens:[
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                } ,
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                },
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                } 
                            ],
                            drag : false,
                            drop : false
                        },
                        {           
                            id:"Tr_" + uuid(),
                            componentId:"Tr",
                            key:"Tr_" + uuid(),
                            cfg:{
                                style:{
                                    //width:400,
                                    //height:400
                                }
                            },
                            childrens:[
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                } ,
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                },
                                {           
                                    id:"Td_" + uuid(),
                                    componentId:"Td",
                                    key:"Td_" + uuid(),
                                    cfg:{
                                        style:{
                                            width:"100"
                                        }
                                    },
                                    childrens:[
                                    ],
                                    drag : false,
                                    drop : true
                                } 
                            ],
                            drag : false,
                            drop : false
                        }

                    ],
                    drag : false,
                    drop : false
                }

            ],
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


        const key = "TableLayout_" + uuid();
        
        return (
           
            <table  
                draggable={this.props.data.drag}
                onDragStart = {this.props.data.drag ? this.onDragStart : null}
                onDrag = {this.props.data.drag ? this.onDrag : null}
                onDragEnd = {this.props.data.drag ? this.onDragEnd : null}

                onDragEnter = {this.props.data.drop ? this.onDragEnter : null}

                onDragOver = {this.props.data.drop ? this.onDragOver : null}
                onDragLeave = {this.props.data.drop ? this.onDragLeave : null}
                onDrop = {this.props.data.drop ? this.onDrop : null}

                className="drogHover"
                
                style={stl}
                id={this.props.id}
            >
                {this.props.children}
            </table>    
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

const TableLayoutComponent = connect(mapStateToProps,mapDispatchToProps)(TableLayout)

export {
    TableLayoutComponent as TableLayout
} ;
