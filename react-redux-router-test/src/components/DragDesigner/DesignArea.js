import React from 'react';
import {Layout,Modal} from 'antd';
import {connect} from 'react-redux';
import {componentsMap} from './dic';
import  {
    createAddDragDesignerComponentAction,
    createRemoveRemoveDragDesignerComponentAction,
    createMoveRemoveDragDesignerComponentAction
} from './action';


import {uuid} from '../../helper';

const {Content} = Layout;


class DesignArea extends React.Component{
    constructor(props){
        super(props);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.handleOk = this.handleOk.bind(this);
        
        this.state = {
            modalVisible :this.props.modalVisible
        }
    }

    onDragEnter(e){
        console.log("--[事件]拖动进来")
        e.preventDefault();
        e.stopPropagation();
    }
    onDragOver(e){
        console.log("--[事件]拖动进来并移动")
        e.preventDefault();
        e.stopPropagation();
    }

    onDrop(e){
        const componentId = e.dataTransfer.getData("dragDomId");
        const componentDic = componentsMap.get(componentId);
        const componentCfg = {
            id : componentDic.id + "_" + uuid(),//html的id
            componentId : componentDic.id,//组件id
            cfg:{}, //其他配置
            key: componentDic.id + "_" + uuid(),
            childrens:[]
        }
        
        //console.log(componentCfg);
        this.props.addComponent(componentCfg);

        /*var dom = this.refs.targetDiv.getDOMNode();

        e.stopPropagation();
        //获取正在拖动的对象ID
        const dragObjId = e.dataTransfer.getData("dragObjId");
        const dom = document.getElementById(dragObjId);
        console.log("放下[" + dragObjId + "]");
        console.log(componentMap.get(dragObjId))

        if(dom.getAttribute("datatype") == "template"){
            const copyDom = componentMap.get(dragObjId).createFaceDom();
           
            $(this).append(copyDom);
        }else{
            $(this).append(dom);
        }*/
    }



    handleOk = (e) => {
        console.log(e);
        this.props.hideModal();
    }




    drawAllComponent(){
        console.log("开始绘制设计区");
        return this.props.designerViewData.map((item) => {
            //console.log(item);
            let componentDic = componentsMap.get(item.componentId);
            //console.log("============================",item.componentId);
            return componentDic.drawMethod(item);
        })
    }


    render(){
        const doms = this.drawAllComponent();
        const modalVisible = this.props.modalVisible; 
        const dataViewJsonStr = JSON.stringify(this.props.designerViewData);
        return(
            <Content style={{height:"100%",background:"#EEE",border:"5px solid #ddd"}}>
                <div 
                    ref="targetDiv" 
                    style={{height:"100%"}} 
                    onDrop={this.onDrop} 
                    onDragEnter={this.onDragEnter} 
                    onDragOver={this.onDragOver}
                    style={{height:"100%",background:"#fff",border:"1px solid #999"}}
                >
                    {doms}
                </div>


                <Modal
                    title="DataViewData"
                    visible={modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    keyboard={true}
                    mask={false}
                    maskClosable={false}
                >
                    <p>{dataViewJsonStr}</p>
                </Modal>
            </Content>
        )
    }
}

const mapStateToProps = (state,ownerProps) =>{
    return({
        designerViewData:state.designerViewData,
        modalVisible:state.modalVisible,
        designerViewData:state.designerViewData
    })
}

const mapDispatchToProps = (dispatch,ownerProps) => {
    return({
        addComponent : (dragComponentCfg) => {
            dispatch(createAddDragDesignerComponentAction(dragComponentCfg,""));
        },
        hideModal:() => {
            dispatch({type:"SHOW_MODAL",value:false});
        }
    })
}

const DesignAreaComponent = connect(mapStateToProps,mapDispatchToProps)(DesignArea)

export {DesignAreaComponent as DesignArea};