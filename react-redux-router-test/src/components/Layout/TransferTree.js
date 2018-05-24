import React from 'react';
import {connect} from 'react-redux'
import {Modal, Tooltip, Row,Col,Form, Icon, Input, Button,Tree ,message} from 'antd';
import _ from 'lodash';
import {lowerDimension} from '../../helper'
const FormItem = Form.Item;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;









class TransferTree extends React.Component {
  constructor(props){
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.state = {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
    }

    this.addNode = this.addNode.bind(this);
    this.onSelect = this.onSelect.bind(this);
    

    this.state.loading = false;
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.queryEnity = this.queryEnity.bind(this);

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

      //判断是否已选
      const allNode = lowerDimension(this.props.dataCollection,"children");
      const existNode = _.findIndex(allNode, { 'key': this.state.selected.key }) > 0 ? true :false ;
      if(existNode){
        message.warning('该实体已经选择');
        return false;
      }
      this.props.addNode(this);
      this.setState({ visible: true });
      
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
          <TreeNode title={item.title} key={item.key} dataRef={item} {...item}>
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
      console.log(this.state.enityDataSourceData)
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

  //选择字段的弹出窗口OK事件
  handleOk(){
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  }

  //选择字段的弹出窗口Canel事件
  handleCancel(){
    this.setState({ visible: false });
  }



  render() {
    
    //树的JSX初始化 根据json数据生成JSX
    const enityDataSourceDom = this.renderTreeNodes(this.state.enityDataSource);
    
    
    //const dataCollectionDom = this.renderTreeNodes(this.state.dataCollection);
    const dataCollectionDom = this.renderTreeNodes(this.props.dataCollection);


    const selectedDom = this.state.selected ? this.renderTreeNodes([this.state.selected]) : null;
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
                defaultExpandedKeys={['0-0-0-2']}
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
                defaultExpandAll
                checkable
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
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
        <Tree
        defaultExpandAll
        checkable
    >
          <TreeNode title="数据集" key="dc" selectable={false} disableCheckbox>
              {selectedDom}
          </TreeNode>
          </Tree>
        </Modal>


      </div>
    );
  }
}



const TRANSFERTREE_ADD_TREE = 'TRANSFERTREE_ADD_TREE';
const createTransfertreeAddTreeAction = (treeNode) => {
  return {
    type : TRANSFERTREE_ADD_TREE,
    treeNode 

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
      //alert(1);
      //console.log(o)
      //alert(o.state.selected)
      dispatch(createTransfertreeAddTreeAction(o.state.selected))
    }
  }
}

const dataCollectionReducer = (state,action) => {
  switch(action.type){

    case 'TRANSFERTREE_ADD_TREE' : {
      return [...state,action.treeNode]
    }
    default : {
      return [{
          title: 'User Enity',
          key: '0-0-0a',
         
          children: [
            { title: 'id', key: '0-0-0-0a' },
            { title: 'name', key: '0-0-0-1a' },
            { title: 'age', key: '0-0-0-2a' },
          ],
        }, {
          title: 'Menu Enity',
          key: '0-0-1a',
          children: [
            { title: 'id', key: '0-0-1-0a' },
            { title: 'name', key: '0-0-1-1a' },
            { title: 'url', key: '0-0-1-2a' },
          ],
        }, {
          title: '0-0-2a',
          key: '0-0-2a',
        }];
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TransferTree);
export {dataCollectionReducer as dataCollectionReducer}