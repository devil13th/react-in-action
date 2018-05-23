import React from 'react';
import { Tree,Icon } from 'antd';
const TreeNode = Tree.TreeNode;

class AntdTreeForHtml extends React.Component{
    
    constructor(props){
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onSelect(selectedKeys, info){
        console.log('selected', selectedKeys, info);
    }

    onCheck(o){
        console.log(o);
    }

    render(){
        return(
            <Tree
                checkable
                draggable
                showIcon
                
                defaultExpandedKeys={['0-0-0']}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
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
        )
    }
}


const treeData = [{
    title: '0-0',
    key: '0-0',
    selectable: false,
    children: [{
      title: '0-0-0',
      key: '0-0-0',
      selectable: false,
      children: [
        { title: '0-0-0-0', key: '0-0-0-0' ,children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ]
        },
        { title: '0-0-0-1', key: '0-0-0-1' },
        { title: '0-0-0-2', key: '0-0-0-2' },
      ],
    }, {
      title: '0-0-1',
      key: '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0' },
        { title: '0-0-1-1', key: '0-0-1-1' },
        { title: '0-0-1-2', key: '0-0-1-2' },
      ],
    }, {
      title: '0-0-2',
      key: '0-0-2',
    }],
  }, {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  }, {
    title: '0-2',
    key: '0-2',
  }];

  


class AntdTreeForData extends React.Component{
    constructor(props){
        super(props);

        this.onExpand = this.onExpand.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.renderTreeNodes = this.renderTreeNodes.bind(this);



        this.state = {
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        }
    }
    
    onExpand(expandedKeys){
        console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    onCheck(checkedKeys){
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }
    onSelect(selectedKeys, info){
        console.log('onSelect', info);
        this.setState({ selectedKeys });
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
    render() {
        return (
        <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
        >
            {this.renderTreeNodes(treeData)}
        </Tree>
        );
    }
}







export {AntdTreeForHtml,AntdTreeForData} ;