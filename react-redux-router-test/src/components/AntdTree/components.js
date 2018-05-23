import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

class AntdTree extends React.Component{
    
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
                showLine
                defaultExpandedKeys={['0-0-0']}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
            >
                <TreeNode title="parent 1" key="0-0">
                <TreeNode title="parent 1-0" key="0-0-0" disabled>
                    <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                    <TreeNode title="leaf" key="0-0-0-1" />
                </TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1">
                    <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                </TreeNode>
                </TreeNode>
            </Tree>
        )
    }
}

export default AntdTree;