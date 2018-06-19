
import React from 'react';
import {Icon,Modal,Table,Button,Input,Row,Col,Popconfirm,message,Tooltip,Divider} from 'antd';
import {connect} from 'react-redux';
import {lowerDimension,uuid} from '../../../helper/index';
import {createSaveDataCollectionAction} from './action';
import {PropertiesForm} from './PropertiesForm';
import _ from 'lodash';



class EditDataCollectionModal extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            dataCollection : this.props.dataCollection,
            visible : this.props.visible,
            //selectedRowKeys:this.props.dataCollection.children.map(item => item.key)
            selectedRowKeys:(this.props.dataCollection.children && this.props.dataCollection.children.length > 0 ) ? [this.props.dataCollection.children[0].key] : [], //选中的属性key数组
            dataCollectionOperateType: this.props.dataCollectionOperateType // 操作类型 add:新增  edit:编辑
          
        }
        
       

        //修改数据集名称
        this.onChangeDataCollectionName = this.onChangeDataCollectionName.bind(this);
        //选择字段或属性
        this.onCheckEditDataCollectionProperties = this.onCheckEditDataCollectionProperties.bind(this);
        //保存数据集
        this.onSaveDataCollection = this.onSaveDataCollection.bind(this);
        //删除属性
        this.onDeleteProperties = this.onDeleteProperties.bind(this);
        //添加属性
        this.onAddProperties = this.onAddProperties.bind(this);
        ////编辑属性界面中的值发生改变
        this.formValueChange = this.formValueChange.bind(this);
        //点击表格行
        this.clickRow = this.clickRow.bind(this);
        //提交编辑属性内容
        this.onSubmit = this.onSubmit.bind(this);
      
        //已选择的属性
        this.selectedPropertiesList = [];
        
        //定义模态表的表头
        this.columns = [
            {
                title: '名称',
                dataIndex: 'name',
                align: "left",
                width: '35%'
            },{
                title: '标题',
                width: '20%',
                align: "left",
                dataIndex: 'title',
            },{
                title: '类型',
                width: '15%',
                align: "center",
                dataIndex: 'dataType',
            },{
                title:'操作',
                width: '30%',
                align: "right",
                dataIndex:'key',
                render: (text, record) => {
                    
                    const operationBtons = [];
                    const baseKey = record.key;
                    if(this.state.dataCollection.children && this.state.dataCollection.children.length > 0 ){
                        
                    
                        if(record.type == 'column'){
                            operationBtons.push(
                                <Tooltip key={baseKey+"_add_tip"} title="新增属性" placement="bottom">
                                    <Icon key={baseKey+"_add_icon"} type="plus-circle" style={{cursor:"pointer"}}  onClick={() => this.onAddProperties(record.key)}/>
                                </Tooltip>
                            )
                        }
                        {/*
                        operationBtons.push(<span key={baseKey+"_span02"} style={{cursor:"pointer",display:"inline-block",width:16}}></span>);
                        
                        operationBtons.push(
                            <Tooltip key={baseKey+"_edit_tip"} title="编辑" placement="bottom">
                                <Icon key={baseKey+"_edit_icon"} type="edit" onClick={() => this.onEditProperties(record.key)} style={{cursor:"pointer"}}/>
                            </Tooltip>
                        );
                        */}
                        operationBtons.push(<span key={baseKey+"_span01"} style={{cursor:"pointer",display:"inline-block",width:16}}></span>);

                        operationBtons.push(                            
                            <Popconfirm key={baseKey+"_pop"} title="确定删除此属性吗?" onConfirm={() => this.onDeleteProperties(record.key)}>
                                <Tooltip key={baseKey+"_del_tip"} title="删除" placement="bottom">
                                    <Icon key={baseKey+"_icon"} type="delete" style={{cursor:"pointer"}}/>
                                </Tooltip>
                            </Popconfirm>
                        )
                    }

                    return operationBtons;
                    
                  
                },
            }
        ];
    }


    //修改实体名称
    onChangeDataCollectionName(e){
        const dataCollection_temp = _.cloneDeep(this.state.dataCollection);
        dataCollection_temp.name = e.target.value;
        this.setState({dataCollection:dataCollection_temp});
    }

    //删除属性
    onDeleteProperties(key){
        const selectedKey = key;
        const allNode = lowerDimension(this.state.dataCollection.children,"children");

        const idx = _.findIndex(allNode, { 'key':selectedKey });
        //选择的属性
        const selectedProperties = _.cloneDeep(allNode[idx]);
        
        const editDataCollection_temp = _.cloneDeep(this.state.dataCollection);
        if(selectedProperties.type == 'column'){//删除字段
            const newPropertiesList = editDataCollection_temp.children.filter(item => {
                return selectedKey != item.key
            })
            editDataCollection_temp.children = newPropertiesList;
        }else if(selectedProperties.type == 'attribute'){//删除属性
            for(let i = 0 , j = editDataCollection_temp.children.length ; i < j ; i++){
                let column = editDataCollection_temp.children[i];
                if(column.children){
                _.remove(column.children, function(attr) {
                    //alert(attr.key + "|" + selectedKey)
                    return attr.key == selectedKey;
                });
                }
            }
        }
    
        this.setState({
            dataCollection : editDataCollection_temp
        })          
    }


    //新增属性
    onAddProperties(key){
        //console.log(key)
        const dataCollection_temp = _.cloneDeep(this.state.dataCollection);
        //console.log(dataCollection_temp)
        const newKey = uuid();
        const newProperties = {        
            title: 'New Property',
            name: '新属性',
            key: newKey,
            type:'attribute',
            dataType:'String',
            selectable : false
        };
        //if(dataCollection_temp.children){ //肯定有子节点,否则点不了添加按钮,不用做判断
        const newPropertiesList = dataCollection_temp.children.map(item => {
            
            if(item.key == key){
                if(!item.children){
                    item.children = [];                    
                }

                item.children.push(newProperties);
            }
            return item;
        })

        dataCollection_temp.children = newPropertiesList;
        console.log(dataCollection_temp);
        this.setState({
            dataCollection:dataCollection_temp,

            selectedRowKeys:[newKey]
        })
        //}

    }
    //编辑字段或属性
    onEditProperties(key){
        this.setState({
            selectedRowKeys:[key]
        });
    }

    //选择字段或属性
    onCheckEditDataCollectionProperties(selectedRowKeys, selectedRows){
        
        /*
        if(selectedRows[0].type != 'column'){//选择的是字段
        }else{
        }*/
        this.setState({
            selectedRowKeys:[selectedRows[0].key]
        });
    }

    //保存数据集
    onSaveDataCollection(){
        this.setState({ loading: true });

        //数据集名称判空
        //console.log(this.state.dataCollection);
        if(_.trim(this.state.dataCollection.name) == ''){
          message.error('请填写数据集名称');
          this.setState({ loading: false });
          return ;
        };

       
        if(this.state.dataCollectionOperateType == 'add'){
            //如果是新增责数据集名称判重
            //console.log(this.props.dataCollectionList);
            const allNode = lowerDimension(this.props.dataCollectionList,"children");
            const existNode = _.findIndex(allNode, { 'name': this.state.dataCollection.name }) >= 0 ? true :false ;

            //如果存在重名节点(重名并且非本节点)
            if(existNode){
                message.error('不能与已有的数据集名称重复');
                this.setState({ loading: false });
                //this.setState({ loading: false, addDataCollectionModalVisible: false });
                return ;
            }
        }
     
        if(this.state.dataCollectionOperateType == 'edit'){
            //如果是新增责数据集名称判重
            //console.log(this.props.dataCollectionList);
            const allNode = lowerDimension(this.props.dataCollectionList,"children");
            const idx = _.findIndex(allNode, { 'name': this.state.dataCollection.name }) ;
            //alert(idx);


            //如果存在重名节点(重名并且非本节点) 判重
            if(  idx >= 0 ){
                //alert(allNode[idx].key + " ||| " +  this.state.dataCollection.key)
                if(allNode[idx].key != this.state.dataCollection.key){
                    message.error('不能与已有的数据集名称重复');
                    this.setState({ loading: false });
                    //this.setState({ loading: false, addDataCollectionModalVisible: false });
                    return ;
                }
            }
        }


        //属性名称及标题判重
        let hasDublicProperty = [];
        const nameMap = new Map();
        const titleMap = new Map();

        
        const columnsAndProperties = lowerDimension(this.state.dataCollection.children,"children");

        columnsAndProperties.forEach(item => {
            if(nameMap.get(item.name)){
                hasDublicProperty.push(item.name);
            }else{
                nameMap.set(item.name,true)
            }
            if(nameMap.get(item.title)){
                hasDublicProperty.push(item.title);
            }else{
                titleMap.set(item.title,true)
            }
        })
        if(hasDublicProperty.length > 0){
            message.error('存在相同的属性名称或标题(' + [...hasDublicProperty] + ')');
            this.setState({ loading: false });
            return;
        }


    
       
        this.props.saveDataCollection(this.state.dataCollection,this.state.dataCollectionOperateType);
      
        message.success('操作成功');
        this.setState({ loading: false });        
        this.props.closeModal();
    }


    
    //编辑属性界面中的值发生改变
    formValueChange(changeObj){
        const dataCollection_temp = _.cloneDeep(this.state.dataCollection);
        const allNode = lowerDimension(dataCollection_temp.children,"children");
        const idx = _.findIndex(allNode, { 'key':this.state.selectedRowKeys[0] });
        
        //已选择的字段或属性
        const property_temp = _.cloneDeep(allNode[idx]);
        
        
        if(property_temp.type == "column"){//如果是字段
            if(changeObj.name){
                property_temp.name=changeObj.name.value;
            }
            if(changeObj.title){
                property_temp.title=changeObj.title.value;
            }

            const newPropertiesList = this.state.dataCollection.children.map(item => {
                return item.key == this.state.selectedRowKeys[0] ? property_temp : item;
            })
            dataCollection_temp.children = newPropertiesList;
        }else if(property_temp.type == "attribute"){//如果是字段的属性
            if(changeObj.name){
                allNode[idx].name=changeObj.name.value;
            }
            if(changeObj.title){
                allNode[idx].title=changeObj.title.value;
            }
        }
        

        
          
        this.setState({
            dataCollection:dataCollection_temp
        });
    }


    
    //提交编辑属性内容
    onSubmit(formData){
        const dataCollection_temp = _.cloneDeep(this.state.dataCollection);
        const allNode = lowerDimension(dataCollection_temp.children,"children");
        const idx = _.findIndex(allNode, { 'key':this.state.selectedRowKeys[0] });

        //已选择的字段或属性
        const property_temp = _.cloneDeep(allNode[idx]);
        console.log(formData);
       
        if(property_temp.type == "column"){//如果是字段
            
            property_temp.name=formData.name;
            property_temp.title=formData.title;
            const newPropertiesList = this.state.dataCollection.children.map(item => {
                return item.key == this.state.selectedRowKeys[0] ? property_temp : item;
            })
            dataCollection_temp.children = newPropertiesList;
        }else if(property_temp.type == "attribute"){//如果是字段的属性
            allNode[idx].name=formData.name;
            allNode[idx].title=formData.title;
        }

      

        
          
          
        
        this.setState({
            dataCollection:dataCollection_temp
        });
       

    }
    
    //点击表格行
    clickRow(record){
        //console.log(record)
        this.setState({
            selectedRowKeys:[record.key]
        });
    }
    
    render(){
        //console.log(this.state.selectedRowKeys[0])
        let checkedProperty = null;
        if(this.state.selectedRowKeys[0]){
            const allNode = lowerDimension(this.state.dataCollection.children,"children");
            //console.log(allNode)
            const idx = _.findIndex(allNode, { 'key':this.state.selectedRowKeys[0] });
            //console.log(idx);
            checkedProperty = allNode[idx];
            //console.log(checkedProperty);
        }

        
        return(
            <Modal
                width={950}
                visible={this.state.visible}
                title="编辑数据集"
                closable={true}
                onCancel={this.props.closeModal}
                footer={[
                    <Button key="back" onClick={this.props.closeModal}>取消</Button>,
                    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.onSaveDataCollection}>确定</Button>
                ]}
            >
                <Row>
                    <Col span={4}>
                        <div style={{paddingTop:4,textAlign:"right"}}>数据集名称：</div>
                    </Col>
                    <Col span={12}>
                        <Input onChange={this.onChangeDataCollectionName} value={this.state.dataCollection.name}/>
                    </Col>
                </Row>
                {/*
                <Divider orientation="left">字段信息</Divider>
                */}
                <Row style={{marginTop:5}} >
                    <Col span={16}>
                        <Table size="small" 
                            style={{marginTop:5}} 
                            defaultExpandAllRows={true}
                            rowSelection={{
                                selectedRowKeys:this.state.selectedRowKeys,
                                onChange:this.onCheckEditDataCollectionProperties,
                                type:"radio"
                            }} 
                            onRow={(record) => {
                                return {
                                  onClick: (e) => {this.clickRow(record);},       // 点击行
                                  onMouseEnter: () => {},  // 鼠标移入行
                                };
                            }}
                            pagination={false} 
                            dataSource={this.state.dataCollection.children} 
                            columns={this.columns}  
                        />
                    </Col>
                    
                    <Col span={7}>
                        {checkedProperty ? <PropertiesForm onSubmit={this.onSubmit} onChange={this.formValueChange} formState={checkedProperty}></PropertiesForm> : null}
                    </Col>
                </Row>
                
            </Modal>

        


        )
    }
}

const mapStateToProps = (state,props) => {
    var moduleState = state.dataViewReducer;
    return {
        dataCollectionList : moduleState.dataCollectionList
    }
}
const mapDispatchToProps = (dispatch,props) => {
    return {
        saveDataCollection : (dataCollection,operateType)=>{
            dispatch(createSaveDataCollectionAction(dataCollection,operateType));
        }
    }
}
const EditDataCollectionModalComponent = connect(mapStateToProps,mapDispatchToProps)(EditDataCollectionModal);


export { EditDataCollectionModalComponent as EditDataCollectionModal};





