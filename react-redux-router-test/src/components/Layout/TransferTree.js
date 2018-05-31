import React from 'react';
import {connect} from 'react-redux'
import {Divider,Table,Modal, Popconfirm,Tooltip, Row,Col,Form, Icon, Input, Button,Tree ,message,Menu,Dropdown} from 'antd';
import EditableCell  from './EditableCell'
import _ from 'lodash';
import {lowerDimension,uuid} from '../../helper'
import './style.css'


const FormItem = Form.Item;
const Search = Input.Search;
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





class TransferTree extends React.Component {

 
  

  constructor(props){
   

    super(props);

    //模态窗口树选择的属性
    this.selectedEnityProps = [];

    
    
    
    this.selectedNodes = [];
    
    //选择实体节点
    this.onSelectEnity = this.onSelectEnity.bind(this);
    //添加数据集弹出属性编辑模态窗口
    this.onAddDataCollection = this.onAddDataCollection.bind(this);
    //勾选数据集
    this.onCheckDataCollection = this.onCheckDataCollection.bind(this);
    //模态窗口中选择数据集属性
    this.onCheckProperties = this.onCheckProperties.bind(this);
    //关闭 添加数据集模态窗口
    this.onCancelAddDataCollectionProperties = this.onCancelAddDataCollectionProperties.bind(this);
    //关闭 编辑数据集属性模态窗口
    this.onCancelEditDataCollectionProperties = this.onCancelEditDataCollectionProperties.bind(this);
    //点击 ok 模态窗口
    this.onHandleAddDataCollectionProperties = this.onHandleAddDataCollectionProperties.bind(this);
    //点击 编辑数据集属性 模态窗口 保存 
    this.onHandleEditDataCollectionProperties = this.onHandleEditDataCollectionProperties.bind(this);
    //选中编辑数据源模态窗口中的属性
    this.onCheckEditDataCollectionProperties = this.onCheckEditDataCollectionProperties.bind(this);
    //点击添加属性
    this.onClickAddProperties = this.onClickAddProperties.bind(this);
    //点击删除属性
    this.onClickRemoveProperties = this.onClickRemoveProperties.bind(this);


    //查询实体
    this.onQueryEnity = this.onQueryEnity.bind(this);  
    //修改数据集名称
    this.onChangeDataCollectionName = this.onChangeDataCollectionName.bind(this);
    //右键点击数据集树节点
    //this.onRightClickDataCollection = this.onRightClickDataCollection.bind(this);

    //修改数据集名称
    this.onChangeEditDataCollectionName = this.onChangeEditDataCollectionName.bind(this);
    //选择数据集树节点
    this.onSelectDataCollection = this.onSelectDataCollection.bind(this);
    //删除数据集树节点
    this.onRemoveDataCollection = this.onRemoveDataCollection.bind(this);

    //点击数据集节点编辑图标
    this.onDataCollectionIconClick = this.onDataCollectionIconClick.bind(this);

    this.onCellChange = this.onCellChange.bind(this);
    this.selectedPropertiesList = [];



    


    
    //定义模态表的表头
    const columns = [
      {
        title: '名称',
        dataIndex: 'name'
      }, {
        title: '标题',
        dataIndex: 'title',
      },{
        title: '类型',
        dataIndex: 'dataType',
      }

    ];


    const columnsForEditColumn = [
      {
        title: '名称',
        dataIndex: 'name',
        width: '60%'
        ,

        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key, 'name')}
          />
        )
      }, {
        title: '标题',
        width: '20%',
        dataIndex: 'title',
      },{
        title: '类型',
        width: '20%',
        dataIndex: 'dataType',
      }
    ];


    
    

    
    const selectProperties = [];
    for (let i = 0; i < 5; i++) {
      selectProperties.push({
        key: i,
        title: `Edward King ${i}`
      });
    }
    
    
    this.state = {
      selectProperties:selectProperties,
      columns : columns,
      columnsForEditColumn:columnsForEditColumn,
      addPropertiesButtonDisabled : true,
      removePropertiesButtonDisabled : true
    }
    //console.log(this.state.selectProperties)
    this.state.loading = false;

    this.state.dataCollectionName = "";
    //enityDataSourceData
    this.state.enityListDataInit = [{
        title: 'SYS_USER',
        name : '用户信息',
        description: '系统用户信息表',
        key: '0-0-0',
        type:'table',
        children: [
          { title: 'ID',name:'用户ID',description:'用户唯一标识',type:'column', dataType:'String' ,key: '0-0-0-0' ,selectable : false},
          { title: 'NAME',name:'用户姓名',description:'用户姓名',type:'column', dataType:'String', key: '0-0-0-1',selectable : false },
          { title: 'AGE',name:'用户年龄',description:'用户年龄',type:'column', dataType:'Integer', key: '0-0-0-2' ,selectable : false},
          { title: 'SEX',name:'用户性别',description:'用户性别',type:'column', dataType:'String', key: '0-0-0-3' ,selectable : false},
        ],
      }, {
        title: 'SYS_MENU',
        name :'菜单信息',
        description : '系统菜单表',
        type:'table',
        key: '0-0-1',
        children: [
          { title: 'ID', name:'菜单ID',description:'菜单唯一标识',type:'column', dataType:'String',key: '0-0-1-0' ,selectable : false},
          { title: 'NAME', name:'菜单名称',description:'菜单名称',type:'column', dataType:'String',key: '0-0-1-1',selectable : false },
          { title: 'URL',name:'菜单URL',description:'菜单URL',type:'column', dataType:'String', key: '0-0-1-2',selectable : false },
        ],
      }, {
        title: 'SYS_ORG',
        name :'组织机构信息',
        description : '系统组织机构表',
        type:'table',
        key: '0-0-2',
        children: [
          { title: 'ID', name:'组织机构ID',description:'组织机构唯一标识',type:'column', dataType:'String',key: '0-0-2-0' ,selectable : false},
          { title: 'NAME', name:'组织机构名称',description:'组织机构名称',type:'column', dataType:'String',key: '0-0-2-1',selectable : false },
          { title: 'CLASSIFY',name:'组织机构类型',description:'组织机构类型',type:'column', dataType:'String', key: '0-0-2-2',selectable : false },
        ],
      }
    ]


    this.state.enityList = _.cloneDeep(this.state.enityListDataInit);
    
    /*
    this.state.enityDataSource = [{
        title: 'User Enity111111111',
        key: '0-0-0',
        children: [
          { title: 'id', key: '0-0-0-0' ,selectable : false},
          { title: 'name', key: '0-0-0-1',selectable : false },
          { title: 'age', key: '0-0-0-2' ,selectable : false},
        ],
      }, {
        title: 'Menu Enity',
        key: '0-0-1',
        children: [
          { title: 'id', key: '0-0-1-0' ,selectable : false},
          { title: 'name', key: '0-0-1-1',selectable : false },
          { title: 'url', key: '0-0-1-2',selectable : false },
        ],
      }, {
        title: '0-0-2',
        key: '0-0-2',
      }
  ];*/



  }


  componentDidMount(){
    
  }

  
  onCellChange = (key, dataIndex) => {
    
    return (value) => {
      const allNode = lowerDimension(this.state.editDataCollection.children,"children");
      //const editDataCollection_temp = _.cloneDeep(this.state.editDataCollection);
      const editNode = allNode.find(item => item.key === key);
      if("column" == editNode.type){ //如果编辑的是字段
        const dataSource = [...this.state.editDataCollection.children];
        const target = dataSource.find(item => item.key === key);
      
        if (target) {
          target[dataIndex] = value;
          //this.setState({ editDataCollection:editDataCollection_temp});
          this.setState({ editDataCollection:this.state.editDataCollection});
        }
      }

      if("attribute" == editNode.type){ //如果编辑的是字段
        for(let i = 0 , j = this.state.editDataCollection.children.length ; i < j ; i++){
          let column = this.state.editDataCollection.children[i];
          if(column.children){
            const target = column.children.find(item => item.key === key);
            target[dataIndex] = value;
          }
        }
      }
    };
  }


  //添加数据集 按钮事件
  onAddDataCollection(){    
    if(this.state.selectedEnity){
      //console.log(this.state.selectedEnity);
      //console.log("-----------------------");
      //判断是否已选
      /*const allNode = lowerDimension(this.props.dataCollection,"children");
      const existNode = _.findIndex(allNode, { 'key': this.state.selectedEnity.key }) > 0 ? true :false ;
      if(existNode){
        message.warning('该实体已经选择');
        return false;
      }
      this.props.onAddDataCollection(this);
      */
      const _temp = _.cloneDeep(this.state.selectedEnity );
      //console.log(_temp)
      //console.log("-----------------------");
      makeTreeNodeKey([_temp])
      //console.log(_temp.children)
      //alert(_temp.key)
      
      this.selectEnityPropertiesObj = _temp;

      
  
      //弹出属性窗口
      this.setState({ 
        //selectEnityPropertiesObj : _temp,
        //columns:columns,//设置表格数据
        addDataCollectionModalVisible:true,//模态窗口是否显示
        selectProperties : _temp.children,
        selectedRowKeys:_temp.children.map(item=>item.key)
        //showContentMenu:false,//右键菜单是否显示  
       // defaultCheckedKeys:_temp.key
      });
      
      //清空选择属性的数据
      this.selectedPropertiesList = _temp.children;
      
    }else{
      message.warning('请先选择实体');
      return false;
    }   
    
  }

  //删除数据集
  onRemoveDataCollection(){    
    if(this.selectedDataCollection){
      this.props.onRemoveDataCollection(this.selectedDataCollection.key)
    }else{
      message.warning('请先选择数据集');
      return false;
    }
    
    
  }

  
  
  //根据数据渲染树形目录节点
  renderTreeNodes(data){
   
    return data.map((item) => {
      
      if (item.children ) {
          const icon = item.type == 'table' ? <Icon type="edit" onClick={()=>{this.onDataCollectionIconClick(item.key)}}/> : null;
          return (
          <TreeNode icon={icon} key={item.key} dataRef={item} {...item}  title={item.name + " " + item.title}>
              {this.renderTreeNodes(item.children)}
          </TreeNode>
          );
      }
      return <TreeNode  {...item} title={item.name + " " + item.title}/>;
    });


  }

  //实体查询
  onQueryEnity(key){
    
    if(!key){
      this.setState({enityList:this.state.enityListDataInit})
    }else{
      
      const queryResult = [];
      //console.log(this.state.enityListDataInit)
      this.state.enityListDataInit.map(item => {
        if(item.title.toLowerCase().indexOf(key.toLowerCase()) != -1){
          queryResult.push(item);
        }
      })

      this.setState({enityList:queryResult});

    }
  }

  //选择实体树节点事件
  onSelectEnity(selectedKeys,e){
    //console.log(selectedKeys);
    //console.log(e);
    if(e.selected){ //如果是选中状态设置选中节点的数据
      //console.log(this.state.enityList);
      //this.setState({selected:this.state.enityList[selectedKeys]});
      //alert(selectedKeys);
      const enityList_temp = lowerDimension(this.state.enityList,"children");
      //console.log(enityList_temp)
      enityList_temp.map((item) => {
        if(item.key == selectedKeys){
         
          //console.log(selectedKeys,item)
          this.setState({selectedEnity:item});
          this.setState({dataCollectionName:_.trim(item.name)});
        } 
      })

    }else{
      this.setState({selectedEnity:null});
      this.setState({dataCollectionName:""});
    }
  }

  onSelectDataCollection(selectedKeys,e){
    if(e.selected){ //如果是选中状态设置选中节点的数据
      
      const dataCollectionList_temp = lowerDimension(this.props.dataCollectionList,"children");
      dataCollectionList_temp.map((item) => {
        if(item.key == selectedKeys){
          //this.setState({selectedDataCollection:item});
          this.selectedDataCollection = item;

        } 
      })

    }else{
      this.selectedDataCollection = null;
      //this.setState({dataCollectionName:""});
    }
  }

  //勾选数据集
  onCheckDataCollection(checkedKeys,e){
    //console.log(checkedKeys);
    //console.log(e);
    if(!e.checked){
      this.selectedNodes = this.selectedNodes.filter(item => {
        return item.key === checkedKeys;
      })
    }else{
      this.selectedNodes.push(checkedKeys);
    }
    
  }


  
  //选择 编辑数据集属性radio
  onCheckProperties(selectedRowKeys, selectedRows){
    this.setState({
      selectedRowKeys : selectedRowKeys
     
    })
    this.selectedPropertiesList = selectedRows;


    
  }



  //点击数据集节点编辑图标
  onDataCollectionIconClick(key){
    //console.log("==========1================");
    //console.log(this.props.dataCollectionList);

    let dataCollection_temp = null;
    for (let item of this.props.dataCollectionList.values()) {
      if(item.key == key){
        dataCollection_temp = _.cloneDeep(item);
        break;
      }
    }
    
    /*if(dataCollection_temp){

      //弹出属性窗口
      this.setState({ 
        //selectEnityPropertiesObj : _temp,
        //columns:columns,//设置表格数据
        editDataCollectionModalVisible:true,//模态窗口是否显示
        //editPropertiesList:dataCollection_temp.children,
        editDataCollectionName:dataCollection_temp.name,
        editDataCollection:dataCollection_temp
        //showContentMenu:false,//右键菜单是否显示  
       // defaultCheckedKeys:_temp.key
      });
    }*/

    if(dataCollection_temp){

      //弹出属性窗口
      this.setState({ 
        //selectEnityPropertiesObj : _temp,
        //columns:columns,//设置表格数据
        editDataCollectionModalVisible:true,//模态窗口是否显示
        //editPropertiesList:dataCollection_temp.children,
       
        editDataCollection:dataCollection_temp
        //showContentMenu:false,//右键菜单是否显示
       // defaultCheckedKeys:_temp.key
      });
    }

    //console.log("==========2================");
    //console.log(this.props.dataCollectionList);

  }

  //编辑数据集 弹出窗口OK事件
  onHandleEditDataCollectionProperties(){
   
    //console.log("===========3===============");
    //console.log(this.props.dataCollectionList);

    this.setState({ loading: true });
    console.log(this.state.editDataCollection);

    this.props.onEditDataCollection(this.state.editDataCollection);
    message.warning('操作成功');
    this.setState({ loading: false, editDataCollectionModalVisible: false });
    this.dataCollection_temp = null;

  }

  //选中编辑数据源模态窗口中的属性
  onCheckEditDataCollectionProperties(selectedRowKeys, selectedRows){
    if(selectedRows[0].type != 'column'){
      this.setState({
        selectedEditDataCollectionPropertiesKey:selectedRowKeys[0],
        addPropertiesButtonDisabled:true,
        removePropertiesButtonDisabled:false
      });
      return ;
    }

    


    this.setState({
      selectedEditDataCollectionPropertiesKey:selectedRowKeys[0],
      addPropertiesButtonDisabled:false,
      removePropertiesButtonDisabled:false
    });
  
  }

  //点击删除属性
  onClickRemoveProperties(){
    if(!this.state.selectedEditDataCollectionPropertiesKey){
      message.warning('请选择数据集字段');
      return;
    }

    const selectedKey = this.state.selectedEditDataCollectionPropertiesKey;
    const allNode = lowerDimension(this.state.editDataCollection.children,"children");
    const idx = _.findIndex(allNode, { 'key':this.state.selectedEditDataCollectionPropertiesKey });
    //选择的属性
    const selectedProperties = _.cloneDeep(allNode[idx]);
    
    const editDataCollection_temp = _.cloneDeep(this.state.editDataCollection);
    if(selectedProperties.type == 'column'){//删除字段
      const newPropertiesList = editDataCollection_temp.children.filter(item => {
        return this.state.selectedEditDataCollectionPropertiesKey != item.key
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
      editDataCollection : editDataCollection_temp,
      selectedEditDataCollectionPropertiesKey:null,
      addPropertiesButtonDisabled:true,
      removePropertiesButtonDisabled:true
    })

  }
  //点击添加属性的时候
  onClickAddProperties(){
  
    if(!this.state.selectedEditDataCollectionPropertiesKey){
      message.warning('请选择数据集字段');
      return;
    }

    //扁平化选择的数据集
    const allNode = lowerDimension(this.state.editDataCollection.children,"children");
    const idx = _.findIndex(allNode, { 'key':this.state.selectedEditDataCollectionPropertiesKey });

    //选择的字段
    const selectedProperties = _.cloneDeep(allNode[idx]);

    if(!selectedProperties.children){//该字段是否存在属性
      selectedProperties.children = [];
    }
    selectedProperties.children.push({
     
      title: 'New Property',
      name: '新属性',
      key: uuid(),
      type:'attribute',
      dataType:'String',
      selectable : false 
     
    });

    console.log(selectedProperties.children)


    //找出需要添加属性的字段
    const newProperties = this.state.editDataCollection.children.map(item => {
      if(item.key === this.state.selectedEditDataCollectionPropertiesKey){
        return selectedProperties;
      }else{
        return item;
      }
    })

    const editDataCollection_temp = _.cloneDeep(this.state.editDataCollection);

    //更新编辑属性模态框试图
    editDataCollection_temp.children = newProperties;

    //alert(selectedProperties.key)
    this.setState({
      editDataCollection:editDataCollection_temp,
      expandedColumnRowKeys:selectedProperties.key
    })
    
    this.props.onEditDataCollection(this.state.editDataCollection);
  }




  //选择字段的弹出窗口OK事件
  onHandleAddDataCollectionProperties(){
    this.setState({ loading: true });

    /*
    const allNode = lowerDimension(this.props.dataCollection,"children");    
    const existNode = _.findIndex(allNode, { 'key': this.state.selectedEnity.key }) > 0 ? true :false ;
    if(existNode){
      message.warning('该实体已经选择');
      this.setState({ loading: false, addDataCollectionModalVisible: false });
      return false;
    }*/

    const _tempDataCollectionName = this.state.dataCollectionName;

    if(_.trim(_tempDataCollectionName) == ''){
      message.warning('请填写数据集名称');
      this.setState({ loading: false });
      return ;
    };


    const allNode = lowerDimension(this.props.dataCollectionList,"children");   
    //console.log(_tempDataCollectionName);
    //console.log(allNode);
    const existNode = _.findIndex(allNode, { 'name': _tempDataCollectionName }) >= 0 ? true :false ;
   


    if(existNode){
      message.warning('不能与已有的数据集名称重复');
      this.setState({ loading: false });
      //this.setState({ loading: false, addDataCollectionModalVisible: false });
      return ;
    }

   
    this.props.onAddDataCollection(this);
  
    message.warning('操作成功');
    this.setState({ loading: false, addDataCollectionModalVisible: false });
    
  }

  //选择字段的弹出窗口Canel事件
  onCancelAddDataCollectionProperties(){
    this.setState({ addDataCollectionModalVisible: false });
  }

  //选择字段的弹出窗口Canel事件
  onCancelEditDataCollectionProperties(){
    this.setState({ editDataCollectionModalVisible: false });
  }

  //修改实体名称
  onChangeDataCollectionName(e){
    this.setState({"dataCollectionName":e.target.value});
  }

  onChangeEditDataCollectionName(e){
    this.setState({editDataCollection:{...this.state.editDataCollection,name:e.target.value}});
  }

 
  onCancelConfirm(){

  }
  
  render() {
    
    //树的JSX初始化 根据json数据生成JSX
    
    const enityDataSourceDom = this.renderTreeNodes(this.state.enityList);
    
    
    //const dataCollectionDom = this.renderTreeNodes(this.state.dataCollection);
    const dataCollectionDom = this.renderTreeNodes(this.props.dataCollectionList);


    const selectedDom = this.state.selectedEnity ? this.renderTreeNodes([this.state.selectedEnity]) : null;
    const selectEnityPropertiesObjDom = this.state.selectEnityPropertiesObj ? this.renderTreeNodes([this.state.selectEnityPropertiesObj]) : null;
    //console.log("----------------");
    //console.log(enityDataSourceDom);
    //console.log(dataCollectionDom);
    //console.log(selectedDom);




    return (

      <div>
        <Row>
          <Col span={5} offset={3} style={{textAlign:"left"}}>
            <div style={{ marginBottom: 16 }}>
              <Tooltip title="输入关键字回车后即可查询">
                <Search
                  placeholder="input search text"
                  size="small"
                  enterButton
                  onSearch={this.onQueryEnity}
                />
              </Tooltip>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={5} offset={3} style={{textAlign:"left"}}>
            <Tree
                defaultExpandedKeys={['dc']}
                onSelect = {this.onSelectEnity}
            >
              <TreeNode title="实体" key="dc" selectable={false}>
              {enityDataSourceDom}
              </TreeNode>
            </Tree>
            
          </Col>


          <Col span={4} offset={1} style={{textAlign:"center"}} align="">
            <div style={{height:"100px",backgroun:"#eee"}}></div>
            <Button type="primary" icon="right" size="small" onClick={this.onAddDataCollection} style={{marginBottom:10}}>添加数据集</Button>
            <br/>
            {/*
            <Button type="primary" icon="left" size="small" onClick={this.onRemoveDataCollection}>删除数据集</Button>
            */}
            <Popconfirm title="确定选中的数据集吗?" onConfirm={this.onRemoveDataCollection} onCancel={this.onCancelConfirm} okText="Yes" cancelText="No">
              <Button type="primary" icon="left" size="small" >删除数据集</Button>
            </Popconfirm>
            
          </Col>


          <Col span={5} offset={1} style={{textAlign:"left"}}>
          {/*
          <Dropdown overlay={menu} trigger={['contextMenu']} visible={true} style={{position:"absolute",left:500,right:500}}>
            <span style={{ userSelect: 'none' }}>.</span>
          </Dropdown>
        */}
              <Tree
                  defaultExpandedKeys={['dc']}
                  checkStrictly={true}
                  onCheck={this.onCheckDataCollection}
                  onSelect={this.onSelectDataCollection}
                  showIcon
                  
                >
                  <TreeNode title="数据集" key="dc" selectable={false} >
                      {dataCollectionDom}
                  </TreeNode>
              </Tree>
           
          </Col>
        
        </Row>


      

        <Modal
          visible={this.state.addDataCollectionModalVisible}
          title="添加数据集"
          closable={false}
          footer={[
            <Button key="back" onClick={this.onCancelAddDataCollectionProperties}>取消</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.onHandleAddDataCollectionProperties}>保存</Button>
          ]}>
          数据集名称：
          <Input onChange={this.onChangeDataCollectionName} value={this.state.dataCollectionName ? this.state.dataCollectionName : ""}/>
          <Table size="small" style={{marginTop:5}} rowSelection={{selectedRowKeys:this.state.selectedRowKeys,onChange:this.onCheckProperties}} pagination={false} dataSource={this.state.selectProperties} columns={this.state.columns}  />
        </Modal>


        <Modal
          width="90%"
          visible={this.state.editDataCollectionModalVisible}
          title="编辑数据集"
          closable={false}
          footer={[
            <Button key="back" onClick={this.onCancelEditDataCollectionProperties}>取消</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.onHandleEditDataCollectionProperties}>保存</Button>
          ]}>
          

          
          <Row>
            <Col span={4} >
              <div style={{paddingTop:4,textAlign:"left"}}>数据集名称：</div>
            </Col>
            <Col span={4}>
              <Input onChange={this.onChangeEditDataCollectionName} value={this.state.editDataCollection ? this.state.editDataCollection.name : ""}/>
            </Col>
          </Row>
          {/*
            <Divider orientation="left">字段信息</Divider>
          */}
          

          <Row style={{marginTop:5}} >
            <Col span={20}>
              <Table size="small" pagination={false}  defaultExpandAllRows={true}  rowSelection={{selectedRowKeys:[this.state.selectedEditDataCollectionPropertiesKey],onChange:this.onCheckEditDataCollectionProperties,type:"radio"}} dataSource={this.state.editDataCollection?this.state.editDataCollection.children:[]} columns={this.state.columnsForEditColumn}  />
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
            
          </Row>
        
        </Modal>

      </div>
    );
  }
}



const TRANSFERTREE_ADD_DATACOLLECTION = 'TRANSFERTREE_ADD_DATACOLLECTION';
const TRANSFERTREE_REMOVE_DATACOLLECTION = 'TRANSFERTREE_REMOVE_DATACOLLECTION';
const TRANSFERTREE_EDIT_DATACOLLECTION = 'TRANSFERTREE_EDIT_DATACOLLECTION';

const DATA_COLLECTION_TREE_KEY_COUNT_ADD = 'DATA_COLLECTION_TREE_KEY_COUNT_ADD';
const createTransfertreeAddDataCollectionAction = (dataCollection) => {
  return {
    type : TRANSFERTREE_ADD_DATACOLLECTION,
    dataCollection 
  }
}


const createTransfertreeRemoveDataCollectionAction = (dataCollectionkey) => {
  return {
    type : TRANSFERTREE_REMOVE_DATACOLLECTION,
    dataCollectionkey 
  }
}

const createTransfertreeEditDataCollectionAction = (dataCollection) => {
  return {
    type : TRANSFERTREE_EDIT_DATACOLLECTION,
    dataCollection
  }
}


const createDataCollectionTreeKeyCountAction = () => {
  return {
    type : DATA_COLLECTION_TREE_KEY_COUNT_ADD
  }
}


const mapStateToProps = (state,ownProps) => {
  return {
    dataCollectionList : state.dataCollectionList
  }
}

const mapDispatchToProps =  (dispatch,ownProps) =>{
  return {
    onAddDataCollection : (o) => {
      
      o.selectEnityPropertiesObj.name = o.state.dataCollectionName;
      o.selectEnityPropertiesObj.children = o.selectedPropertiesList;
      
      //console.log(o.selectedPropertiesList);
      //dispatch(createTransfertreeAddTreeAction(o.state.selectedEnity))
      dispatch(createTransfertreeAddDataCollectionAction(o.selectEnityPropertiesObj))
    },

    onEditDataCollection : (dataCollection) => {
      dispatch(createTransfertreeEditDataCollectionAction(dataCollection))
    },


    onRemoveDataCollection:(key)=>{
      dispatch(createTransfertreeRemoveDataCollectionAction(key));
    }
  }
}




//实体初始化数据(生产中使用ajax)
const dataCollectionListDataInit = [{
  title: 'SYS_USER',
  name : '用户信息',
  description: '系统用户信息表',
  key: '0-0-0',
  type:'table',
  children: [
    { title: 'ID',name:'用户ID',description:'用户唯一标识',type:'column', dataType:'String', key: '0-0-0-0' ,selectable : false},
    { title: 'NAME',name:'用户姓名',description:'用户姓名',type:'column', dataType:'String', key: '0-0-0-1',selectable : false },
    { title: 'AGE',name:'用户年龄',description:'用户年龄',type:'column', dataType:'Integer', key: '0-0-0-2' ,selectable : false},
    { title: 'SEX',name:'用户性别',description:'用户性别',type:'column', dataType:'String', key: '0-0-0-3' ,selectable : false},
  ],
}, {
  title: 'SYS_MENU',
  name :'菜单信息',
  description : '系统菜单表',
  type:'table',
  key: '0-0-1',
  children: [
    { title: 'ID', name:'菜单ID',description:'菜单唯一标识',type:'column', dataType:'String',key: '0-0-1-0' ,selectable : false},
    { title: 'NAME', name:'菜单名称',description:'菜单名称',type:'column', dataType:'String',key: '0-0-1-1',selectable : false },
    { title: 'CREATE_DATE',name:'创建日期',description:'创建日期',type:'column', dataType:'String', key: '0-0-1-2',selectable : false ,
  
    children: [{
      title: 'CREATE_DATE_FROM',
      name: '创建日期上限',
      key: '0-0-1-2-1',
      type:'attribute',
      selectable : false 
    }, {
      title: 'CREATE_DATE_TO',
      name: '创建日期下限',
      age: 18,
      address: 'London No. 4 Lake Park',
      key: '0-0-1-2-2',
      type:'attribute',
      selectable : false 
    }]
    },
  ],
}];


const dataCollection2ListReducer = (state = dataCollectionListDataInit,action) => {
  
  switch(action.type){
    case 'TRANSFERTREE_ADD_DATACOLLECTION' : {
      var _nodeTemp = _.cloneDeep(action.dataCollection);
      //重新设置key
      //console.log(_nodeTemp)
      makeTreeNodeKey([_nodeTemp]);
      //console.log(_nodeTemp)
      return [...state,_nodeTemp];
    }

    case 'TRANSFERTREE_REMOVE_DATACOLLECTION' : {
      var dataCollectionList_temp = state.filter(item => {
        return item.key != action.dataCollectionkey;        
      })
      return dataCollectionList_temp;
    }

    case 'TRANSFERTREE_EDIT_DATACOLLECTION' : {
      console.log("============eee==============");
      console.log(action.dataCollection);
      console.log(state);

     /* return state;*/

      const newDataCollection = state.map(item => {
        if(item.key == action.dataCollection.key){
          return action.dataCollection;
        }else{
          return item;
        }
      })

      return newDataCollection;
    }
    default : {
      return state;
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TransferTree);
export {dataCollection2ListReducer as dataCollection2ListReducer}