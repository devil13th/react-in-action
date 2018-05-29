import React from 'react';
import {connect} from 'react-redux'
import {Table,Modal, Tooltip, Row,Col,Form, Icon, Input, Button,Tree ,message} from 'antd';
 
import _ from 'lodash';
import {lowerDimension,uuid} from '../../helper'
const FormItem = Form.Item;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;



//重新生成实体key
const makeTreeNodeKey = (dataCollection) => {
  dataCollection.map((item) => {
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

    this.onSelect = this.onSelect.bind(this);
    this.addNode = this.addNode.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCheckDataCollection = this.onCheckDataCollection.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.queryEnity = this.queryEnity.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
    this.onCheckEnityProps = this.onCheckEnityProps.bind(this);
    this.selectedPropertiesData = [];


    


    
    //定义模态表的表头
    const columns = [{
        title: 'Name',
        dataIndex: 'title'
      }, {
        title: 'Key',
        dataIndex: 'key',
      },{
        title: 'Data Type',
        dataIndex: 'type',
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
      columns : columns
    }
    //console.log(this.state.selectProperties)
    this.state.loading = false;
    this.state.enityDataSourceData = [{
      title: 'User Enity',
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
        key: '0-0-2'
    }]


    this.state.enityDataSource = [{
        title: 'User Enity',
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
      }];
  }

  //添加数据集 按钮事件
  addNode(){    
    if(this.state.selected){
      //console.log(this.state.selected);
      //console.log("-----------------------");
      //判断是否已选
      /*const allNode = lowerDimension(this.props.dataCollection,"children");
      const existNode = _.findIndex(allNode, { 'key': this.state.selected.key }) > 0 ? true :false ;
      if(existNode){
        message.warning('该实体已经选择');
        return false;
      }
      this.props.addNode(this);
      */
      
      

      const _temp = _.cloneDeep(this.state.selected );
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
        visible:true,//模态窗口是否显示
        selectProperties : _temp.children,
        selectedRowKeys:_temp.children.map(item=>item.key)
        //showContentMenu:false,//右键菜单是否显示  
       // defaultCheckedKeys:_temp.key
      });
      

      //清空选择属性的数据
      this.selectedPropertiesData = _temp.children;
      
    }else{
      message.warning('请先选择实体');
      return false;
    }
    
    
  }

  componentDidMount(){
    
  }
  
  //根据数据渲染树形目录节点
  renderTreeNodes(data){
   
    return data.map((item) => {
      
      if (item.children ) {
          
          return (
          <TreeNode  key={item.key} dataRef={item} {...item} >
              {this.renderTreeNodes(item.children)}
          </TreeNode>
          );
      }
      return <TreeNode {...item} />;
    });


  }

  //实体查询
  queryEnity(key){
    
    if(!key){
      this.setState({enityDataSource:this.state.enityDataSourceData})
    }else{
      
      const queryResult = [];
      //console.log(this.state.enityDataSourceData)
      this.state.enityDataSourceData.map(item => {
        if(item.title.toLowerCase().indexOf(key.toLowerCase()) != -1){
          queryResult.push(item);
        }
      })

      this.setState({enityDataSource:queryResult});

    }
  }

  //选择实体树节点事件
  onSelect(selectedKeys,e){
    //console.log(selectedKeys);
    //console.log(e);
    if(e.selected){ //如果是选中状态设置选中节点的数据
      //console.log(this.state.enityDataSource);
      //this.setState({selected:this.state.enityDataSource[selectedKeys]});
      //alert(selectedKeys);
      const enityDataSource_temp = lowerDimension(this.state.enityDataSource,"children");
      //console.log(enityDataSource_temp)
      enityDataSource_temp.map((item) => {
        if(item.key == selectedKeys){
         
          //console.log(selectedKeys,item)
          this.setState({selected:item});
        } 
      })

    }else{
      
      this.setState({selected:null});
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

  //勾选模态窗口属性
  onCheckEnityProps(checkedKeys,e){
    //console.log(this.state.selectEnityPropertiesObj);
    if(e.checked){
      this.selectedEnityProps.push(checkedKeys);
    }else{
     
      this.selectedEnityProps = _.remove(this.selectedEnityProps, function(n) {
        return n.key === checkedKeys;
      });
    } 

    //console.log(this.selectedEnityProps);
  }


  

  onChange(selectedRowKeys, selectedRows){
    this.setState({
      selectedRowKeys : selectedRowKeys
    })
    this.selectedPropertiesData = selectedRows;
    
  }

  //选择字段的弹出窗口OK事件
  handleOk(){
    this.setState({ loading: true });

    /*
    const allNode = lowerDimension(this.props.dataCollection,"children");    
    const existNode = _.findIndex(allNode, { 'key': this.state.selected.key }) > 0 ? true :false ;
    if(existNode){
      message.warning('该实体已经选择');
      this.setState({ loading: false, visible: false });
      return false;
    }*/
    this.props.addNode(this);

    message.warning('操作成功');

    
    this.setState({ loading: false, visible: false });

    
    
  }

  //选择字段的弹出窗口Canel事件
  handleCancel(){
    this.setState({ visible: false });
  }

  //右键菜单
  onRightClick(){
    //this.setState({showContentMenu:true})
  }


  render() {
    
    //树的JSX初始化 根据json数据生成JSX
    const enityDataSourceDom = this.renderTreeNodes(this.state.enityDataSource);
    
    
    //const dataCollectionDom = this.renderTreeNodes(this.state.dataCollection);
    const dataCollectionDom = this.renderTreeNodes(this.props.dataCollection);


    const selectedDom = this.state.selected ? this.renderTreeNodes([this.state.selected]) : null;
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
                  onSearch={this.queryEnity}
                />
              </Tooltip>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={5} offset={3} style={{textAlign:"left"}}>
            <Tree
                defaultExpandedKeys={['dc']}
                onSelect = {this.onSelect}
                
            >
              <TreeNode title="实体" key="dc" selectable={false}>
              {enityDataSourceDom}
              </TreeNode>
            </Tree>


          </Col>


          <Col span={4} offset={1} style={{textAlign:"center"}} align="">
            <div style={{height:"100px",backgroun:"#eee"}}></div>
            <Button type="primary" icon="right" size="small" onClick={this.addNode} style={{marginBottom:10}}>添加数据集</Button>
            <br/>
            <Button type="primary" icon="left" size="small" onClick={this.addNode}>删除数据集</Button>
          </Col>


          <Col span={5} offset={1} style={{textAlign:"left"}}>
           <Tree
              defaultExpandedKeys={['dc']}
              checkable
              checkStrictly={true}
              onCheck={this.onCheckDataCollection}
              onRightClick={this.onRightClick}
            >
              <TreeNode title="数据集" key="dc" >
                  {dataCollectionDom}
              </TreeNode>
             
            </Tree>
          
          </Col>
        </Row>




        <Modal
          visible={this.state.visible}
          title="选择属性"
          closable={false}
          width="80%"
          
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}>
           
          <Table  rowSelection={{selectedRowKeys:this.state.selectedRowKeys,onChange:this.onChange}} pagination={false} dataSource={this.state.selectProperties} columns={this.state.columns}  />
          

        </Modal>

        
      </div>
    );
  }
}



const TRANSFERTREE_ADD_TREE = 'TRANSFERTREE_ADD_TREE';
const DATA_COLLECTION_TREE_KEY_COUNT_ADD = 'DATA_COLLECTION_TREE_KEY_COUNT_ADD';
const createTransfertreeAddTreeAction = (treeNode) => {
  return {
    type : TRANSFERTREE_ADD_TREE,
    treeNode 

  }
}

const createDataCollectionTreeKeyCountAction = () => {
  return {
    type : DATA_COLLECTION_TREE_KEY_COUNT_ADD
  }
}


const mapStateToProps = (state,ownProps) => {
  return {
    dataCollection : state.dataCollection
  }
}

const mapDispatchToProps =  (dispatch,ownProps) =>{
  return {
    addNode : (o) => {
      o.selectEnityPropertiesObj.children = o.selectedPropertiesData;
      //console.log(o.selectedPropertiesData);
      //dispatch(createTransfertreeAddTreeAction(o.state.selected))
      dispatch(createTransfertreeAddTreeAction(o.selectEnityPropertiesObj))
      
    }
  }
}




//实体初始化数据(生产中使用ajax)
const enityDataInit = [{
  title: 'User Enity',
  key: '0-0-0a',
 
  children: [
    { title: 'id', key: '0-0-0-0a' ,type:"string"},
    { title: 'name', key: '0-0-0-1a' ,type:"string"},
    { title: 'age', key: '0-0-0-2a',type:"string" },
  ],
}, {
  title: 'Menu Enity',
  key: '0-0-1a',
  
  children: [
    { title: 'id', key: '0-0-1-0a' ,type:"string"},
    { title: 'name', key: '0-0-1-1a',type:"string" },
    { title: 'url', key: '0-0-1-2a',type:"string" },
  ],
}, {
  title: '0-0-2a',
  key: '0-0-2a',
}];


const dataCollectionReducer = (state = enityDataInit,action) => {
  switch(action.type){
    case 'TRANSFERTREE_ADD_TREE' : {
      var _nodeTemp = _.cloneDeep(action.treeNode);
      //重新设置key
      makeTreeNodeKey([_nodeTemp]);
      //console.log(_nodeTemp)
      return [...state,_nodeTemp];
    }
    default : {
      return state;
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TransferTree);
export {dataCollectionReducer as dataCollectionReducer}