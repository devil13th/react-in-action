
import React from 'react';
import {Row,Col,Icon,Tree,Button,Popconfirm,message} from 'antd';
import {lowerDimension,uuid} from '../../helper';
import {EditDataCollectionModal} from './EditDataCollectionModal';
import {createDeleteDataCollectionAction} from './action';
import {connect} from 'react-redux';
const TreeNode = Tree.TreeNode;


//重新生成实体key
const makeTreeNodeKey = (dataCollection) => {
    dataCollection.map((item) => {
        //console.log(item);
        item.key = "NodeKey_" + uuid();
        if(item.children){
        makeTreeNodeKey(item.children)
        }
    })
}



class Transfer extends React.Component {
    constructor(props){
        super(props);
        
        //state初始化
        this.state = {
            selectedEnity:null, // 选择的实体
            editDataCollectionModalVasible :false ,//模态窗口显示状态
            selectedDataCollection:null //选择的数据集
        }
        
        //选择实体节点
        this.onSelectEnity = this.onSelectEnity.bind(this);
        //点击添加数据集按钮
        this.onClickAddDataCollectionBton = this.onClickAddDataCollectionBton.bind(this);
        //删除数据集树节点
        this.onDeleteDataCollection = this.onDeleteDataCollection.bind(this);
        //选择数据集节点
        this.onSelectDataCollection = this.onSelectDataCollection.bind(this);
        //点击数据集编辑图标
        this.onClickDataCollectionEditIcon = this.onClickDataCollectionEditIcon.bind(this);
        //关闭模态窗口
        this.closeModal = this.closeModal.bind(this);
    }

    //选择实体树节点事件
    onSelectEnity(selectedKeys,e){
        if(e.selected){ //如果是选中状态设置选中节点的数据
            //console.log(this.props.enityList);
            const selectedEnity = this.props.enityList.find(item => { 
                //console.log(item.key +"|"+ selectedKeys)
                return(item.key == selectedKeys);
            })
            
            this.setState({selectedEnity:selectedEnity});
        }else{
            this.setState({selectedEnity:null});
        }
        
    }


    //选择实体树节点事件
    onSelectDataCollection(selectedKeys,e){
        if(e.selected){ //如果是选中状态设置选中节点的数据
            const dataCollectionList_temp = lowerDimension(this.props.dataCollectionList,"children");
            dataCollectionList_temp.map((item) => {
                if(item.key == selectedKeys){
                    //this.setState({selectedDataCollection:item});
                    this.setState({selectedDataCollection:item})
                } 
            })
        }else{
            this.setState({selectedDataCollection:null})
        }
    }


    //点击添加数据集按钮
    onClickAddDataCollectionBton(){
        //console.log(this.state.selectedEnity);
        if(this.state.selectedEnity){
            const selectedEnity_temp = _.cloneDeep(this.state.selectedEnity);
            

            makeTreeNodeKey([selectedEnity_temp]);
            this.setState({
                selectedEnity:selectedEnity_temp
            })
            this.setState({
                editDataCollectionModalVasible:true,
                dataCollectionOperateType:"add" //模态窗口保存按钮执行新增数据集操作
            })
        }else{
            message.warning('请先选择实体');
            return false;
        }   
    }


    //删除数据集
    onDeleteDataCollection(){    
        //console.log(this.state.selectedDataCollection)
        if(this.state.selectedDataCollection){
            this.props.deleteDataCollection(this.state.selectedDataCollection.key)
        }else{
            message.warning('请先选择数据集');
            return false;
        }
    }

    //点击数据集编辑图标
    onClickDataCollectionEditIcon(dataCollectionKey){
        const dataCollectionList_temp = lowerDimension(this.props.dataCollectionList,"children");
        dataCollectionList_temp.map((item) => {
            if(item.key == dataCollectionKey){
                //this.setState({selectedDataCollection:item});
                //设置模态窗口编辑的数据集
                this.setState({selectedEnity:item})
            } 
        })
        this.setState({
            editDataCollectionModalVasible:true,
            dataCollectionOperateType:"edit"//模态窗口保存按钮执行编辑数据集操作
        })
    }


    //根据数据渲染树形目录节点
    renderTreeNodes(data){

        return data.map((item) => {
            
            if (item.children ) {
                const icon = item.type == 'table' ? <Icon type="edit" onClick={()=>{this.onClickDataCollectionEditIcon(item.key)}}/> : null;
                return (
                <TreeNode icon={icon} key={item.key} dataRef={item} {...item}  title={item.name + " " + item.title}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
                );
            }
            return <TreeNode  {...item} title={item.name + " " + item.title}/>;
        });
    }


    //关闭模态窗口
    closeModal(){
        this.setState({
            editDataCollectionModalVasible:false
        })
    }
    render(){
       
        const enityListDom = this.renderTreeNodes(this.props.enityList)
        const dataCollectionDom = this.renderTreeNodes(this.props.dataCollectionList);

        return(
            <div>
            <Row>
                <Col span={10}>
                    <Tree
                        defaultExpandedKeys={['dc']}
                        onSelect = {this.onSelectEnity}
                        showLine
                    >
                        <TreeNode title="实体" key="dc" selectable={false}>
                        {enityListDom}
                        </TreeNode>
                    </Tree>
                </Col>
                <Col span={3}>
                    <div style={{height:"100px",backgroun:"#eee"}}></div>
                    <Button icon="right" type="primary" size="small" onClick={this.onClickAddDataCollectionBton} style={{marginBottom:10}}>添加</Button>
                    <br/>
                    {/*
                    <Button type="primary" icon="left" size="small" onClick={this.onRemoveDataCollection}>删除数据集</Button>
                    */}
                    <Popconfirm title="确定选中的数据集吗?" onConfirm={this.onDeleteDataCollection} onCancel={this.onCancelConfirm} okText="Yes" cancelText="No">
                        <Button  icon="left" size="small" >删除</Button>
                    </Popconfirm>
                </Col>
                <Col span={10}>
                    <Tree
                        defaultExpandedKeys={['dc']}
                        checkStrictly={true}
                        onSelect={this.onSelectDataCollection}
                        showIcon
                        showLine
                    >
                        <TreeNode title="数据集" key="dc" selectable={false} >
                            {dataCollectionDom}
                        </TreeNode>
                    </Tree>    
                </Col>
            </Row>

            
            {
                this.state.editDataCollectionModalVasible ? 
                <EditDataCollectionModal 
                    closeModal={this.closeModal} 
                    dataCollectionOperateType = {this.state.dataCollectionOperateType}
                    dataCollection={this.state.selectedEnity} 
                    visible={true}>
                </EditDataCollectionModal> 
                : null}
            
            </div>

        )
    }
}



const mapStateToProps = (state,props) => {
    return {
        enityList : (function(){
            //关键字搜索结果
            if(state.dataViewSearchKeyWord){
                if(state.enityList && state.enityList.length > 0){
                    const enityListFilterResult = []
                    state.enityList.filter(item => {
                        //匹配实体的name和title
                        if(
                            item.name.toLowerCase().indexOf(state.dataViewSearchKeyWord.trim().toLowerCase()) != -1 
                            ||
                            item.title.toLowerCase().indexOf(state.dataViewSearchKeyWord.trim().toLowerCase()) != -1 
                        ){
                            enityListFilterResult.push(item);
                        }
                    })
                    return enityListFilterResult;
                }
            }
            return state.enityList ;
        })(),
        dataCollectionList : state.dataCollectionList
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        deleteDataCollection : (dataCollectionKey) => {
            dispatch(createDeleteDataCollectionAction(dataCollectionKey));
        }
    }
}

const TransferComponent = connect(mapStateToProps,mapDispatchToProps)(Transfer);

export { TransferComponent as Transfer };








