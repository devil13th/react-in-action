
import React from 'react';
import {Icon,Modal,Table,Button,Input,Row,Col,Popconfirm,message,Tooltip} from 'antd';
import {connect} from 'react-redux';
import {lowerDimension,uuid} from '../../helper';
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
            selectedRowKeys:[], //选中的属性
            dataCollectionOperateType: this.props.dataCollectionOperateType // 操作类型 save:新增  edit:编辑
            
        }
        
       

        //修改数据集名称
        this.onChangeDataCollectionName = this.onChangeDataCollectionName.bind(this);
        //选择字段或属性
        this.onCheckEditDataCollectionProperties = this.onCheckEditDataCollectionProperties.bind(this);
        //保存数据集
        this.onSaveDataCollection = this.onSaveDataCollection.bind(this);
        //删除数据集属性或字段
        this.onClickRemoveProperties = this.onClickRemoveProperties.bind(this);
        //删除属性
        this.onDeleteProperties = this.onDeleteProperties.bind(this);
        //添加属性
        this.onAddProperties = this.onAddProperties.bind(this);

        //已选择的属性
        this.selectedPropertiesList = [];
        
        //定义模态表的表头
        this.columns = [
            {
              title: '名称',
              dataIndex: 'name',
              align: "left",
              width: '35%'
            }, {
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
                align: "center",
                dataIndex:'key',
                render: (text, record) => {
                    
                    const operationBtons = [];
                    const baseKey = record.key;
                    if(this.state.dataCollection.children && this.state.dataCollection.children.length > 1 ){
                        operationBtons.push(
                            <Popconfirm key={baseKey+"_pop"} title="确定删除此属性吗?" onConfirm={() => this.onDeleteProperties(record.key)}>
                                <Tooltip key={baseKey+"_del_tip"} title="删除" placement="bottom">
                                    <Icon key={baseKey+"_icon"} type="delete" style={{cursor:"pointer"}}/>
                                </Tooltip>
                            </Popconfirm>
                        )
                    }
                    if(record.type == 'column'){
                        operationBtons.push(<span key={baseKey+"_span01"} style={{cursor:"pointer",display:"inline-block",width:16}}></span>);
                        operationBtons.push(
                            <Tooltip key={baseKey+"_add_tip"} title="新增属性" placement="bottom">
                                <Icon key={baseKey+"_add_icon"} type="plus-circle" style={{cursor:"pointer"}}  onClick={() => this.onAddProperties(record.key)}/>
                            </Tooltip>
                        )
                    }
                    operationBtons.push(<span key={baseKey+"_span02"} style={{cursor:"pointer",display:"inline-block",width:16}}></span>);
                    
                    operationBtons.push(
                        <Tooltip key={baseKey+"_edit_tip"} title="编辑" placement="bottom">
                            <Icon key={baseKey+"_edit_icon"} type="edit"  style={{cursor:"pointer"}}/>
                        </Tooltip>
                    );


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
        alert(key)
        const dataCollection_temp = _.cloneDeep(this.state.dataCollection);

        
        if(dataCollection_temp.children){
            const newPropertiesList = dataCollection_temp.children.map(item => {
                
                if(item.key == key){
                    if(!item.children){
                        item.children = [];
                        item.children.push({        
                            title: 'New Property',
                            name: '新属性',
                            key: uuid(),
                            type:'attribute',
                            dataType:'String',
                            selectable : false             
                        });
                    }
                }
                return item;
            })

            dataCollection_temp.children = newPropertiesList;
            console.log(dataCollection_temp);
            this.setState({dataCollection:dataCollection_temp})
        }



       

        
    }


    //选择字段或属性
    onCheckEditDataCollectionProperties(selectedRowKeys, selectedRows){
        
        if(selectedRows[0].type != 'column'){
            this.setState({
              selectedPropertiesKey:selectedRowKeys[0],
              addPropertiesButtonDisabled:true,
              removePropertiesButtonDisabled:false,
              selectedRowKeys:[selectedRows[0].key]
            });
            
        }else{
            this.setState({
                selectedPropertiesKey:selectedRowKeys[0],
                addPropertiesButtonDisabled:false,
                removePropertiesButtonDisabled:false,
                selectedRowKeys:[selectedRows[0].key]
            });
        }

    }

    //保存数据集
    onSaveDataCollection(){
        this.setState({ loading: true });
        console.log(this.state.dataCollection);
        if(_.trim(this.state.dataCollection.name) == ''){
          message.warning('请填写数据集名称');
          this.setState({ loading: false });
          return ;
        };

        console.log(this.props.dataCollectionList);
        const allNode = lowerDimension(this.props.dataCollectionList,"children");
        const existNode = _.findIndex(allNode, { 'name': this.state.dataCollection.name }) >= 0 ? true :false ;
        if(existNode){
          message.warning('不能与已有的数据集名称重复');
          this.setState({ loading: false });
          //this.setState({ loading: false, addDataCollectionModalVisible: false });
          return ;
        }
    
       
        this.props.saveDataCollection(this.state.dataCollection,this.state.dataCollectionOperateType);
      
        message.warning('操作成功');
        this.setState({ loading: false });        
        this.props.closeModal();
    }


    //删除数据集属性或字段
    onClickRemoveProperties(){

        if(!this.state.selectedPropertiesKey){
            message.warning('请选择数据集字段');
            return;
        }
      
          const selectedKey = this.state.selectedPropertiesKey;
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
            dataCollection : editDataCollection_temp,
            selectedPropertiesKey:null,
            addPropertiesButtonDisabled:true,
            removePropertiesButtonDisabled:true
          })        
    }

  
    
    render(){
        return(
            <Modal
                width="90%"
                visible={this.state.visible}
                title="编辑数据集"
                closable={false}
                footer={[
                    <Button key="back" onClick={this.props.closeModal}>取消</Button>,
                    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.onSaveDataCollection}>保存</Button>
                ]}
            >
                <Row>
                    <Col span={4} >
                        <div style={{paddingTop:4,textAlign:"left"}}>数据集名称：</div>
                    </Col>
                    <Col span={4}>
                        <Input onChange={this.onChangeDataCollectionName} value={this.state.dataCollection.name}/>
                    </Col>
                </Row>
                {/*
                <Divider orientation="left">字段信息</Divider>
                */}
                <Row style={{marginTop:5}} >
                    <Col span={10}>
                        <Table size="small" 
                            style={{marginTop:5}} 
                            defaultExpandAllRows={true}
                            rowSelection={{
                                selectedRowKeys:this.state.selectedRowKeys,
                                onChange:this.onCheckEditDataCollectionProperties,
                                type:"radio"
                            }} 
                            pagination={false} 
                            dataSource={this.state.dataCollection.children} 
                            columns={this.columns}  
                        />
                    </Col>
                    <Col span={3} offset={1} style={{textAlign:"left"}}>
                        <Button size="small" icon="plus" type="primary" disabled={this.state.addPropertiesButtonDisabled}  title="添加属性" onClick={this.onClickAddProperties}></Button>
                        <br/>
                        <Popconfirm title="确定删除吗?" onConfirm={this.onClickRemoveProperties} onCancel={this.onCancelConfirm} okText="Yes" cancelText="No">
                            <Button size="small" icon="minus" style={{marginTop:5}} disabled={this.state.removePropertiesButtonDisabled} type="primary" title="删除属性" ></Button>
                        </Popconfirm>
                        {/*
                        <Button size="small" icon="minus" style={{marginTop:5}} disabled={this.state.removePropertiesButtonDisabled} type="primary" title="删除属性" onClick={this.onClickRemoveProperties}></Button>
                        */}
                        <br/>
                        <Button size="small" icon="edit" style={{marginTop:5}} type="primary" title="编辑属性" ></Button>
                    </Col>

                    <Col span={9}>
                        <PropertiesForm></PropertiesForm>
                    </Col>
                </Row>
                
            </Modal>

        


        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        dataCollectionList : state.dataCollectionList
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





