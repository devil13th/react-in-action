import React from 'react';
import { Row,Col,Form, Icon, Input, Button,Tree } from 'antd';
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

    this.state.treeData = [{
      title: '实体',
      key: '0-0',
      selectable: false,
      children: [{
        title: 'User Enity',
        key: '0-0-0',
        selectable: false,
        children: [
          { title: 'id', key: '0-0-0-0' },
          { title: 'name', key: '0-0-0-1' },
          { title: 'age', key: '0-0-0-2' },
        ],
      }, {
        title: 'Menu Enity',
        key: '0-0-1',
        children: [
          { title: 'id', key: '0-0-1-0' },
          { title: 'name', key: '0-0-1-1' },
          { title: 'url', key: '0-0-1-2' },
        ],
      }, {
        title: '0-0-2',
        key: '0-0-2',
      }],
    }];


  }


  addNode(){

  }


  renderTreeNodes(data){
    return data.map((item) => {
    if (item.children) {
        return (
        <TreeNode title={item.title} key={item.key} dataRef={item} {...item}>
            {this.renderTreeNodes(item.children)}
        </TreeNode>
        );
    }
    return <TreeNode {...item} />;
    });
  }


  onSelect(selectedKeys,e){
    console.log(selectedKeys);
    console.log(e);
    
    if(e.selected){
      this.setState({selected:selectedKeys});
    }
  }

  render() {
    

    const treeDom = this.renderTreeNodes(this.state.treeData);
    
    return (

      <div>
        <Row>
          <Col span={5} offset={3} style={{textAlign:"left"}}>
            <div style={{ marginBottom: 16 }}>
              
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                size="small"
                enterButton
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={5} offset={3} style={{textAlign:"left"}}>
           

            <Tree
                defaultSelectedKeys={['0-0-0-2']}
                defaultExpandedKeys={['0-0-0-2']}
                onSelect = {this.onSelect}
            >
              {treeDom}
            </Tree>


          </Col>


          <Col span={4} offset={1} style={{textAlign:"center"}} align="">
            <div style={{height:"100px",backgroun:"#eee"}}></div>
            <Button type="primary" icon="right" size="small" onClick={this.addNode()} style={{marginBottom:10}}>添加数据集</Button>
            <br/>
            <Button type="primary" icon="left" size="small">删除数据集</Button>
          </Col>


          <Col span={5} offset={1} style={{textAlign:"left"}}>
            <Tree
                defaultExpandAll
                checkable
               
                defaultExpandedKeys={['0-0-0']}
                defaultSelectedKeys={['0-0-0']}
                defaultCheckedKeys={['0-0-0']}
            >
              <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0" disabled>
                  <TreeNode title="leaf12" key="0-0-0-0" icon={<Icon type="meh-o" />} disableCheckbox selectable={false}/>
                  <TreeNode title="leaf2" key="0-0-0-1"  icon={<Icon type="meh-o" />} />
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                  <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
              </TreeNode>
              </TreeNode>
            </Tree>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TransferTree