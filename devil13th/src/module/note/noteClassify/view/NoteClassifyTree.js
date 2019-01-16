import React from 'react';
import{Tree,Menu,Dropdown,Icon} from 'antd';
const { TreeNode } = Tree;
const SubMenu = Menu.SubMenu;
class NoteClassifyTree extends React.PureComponent{
    constructor(props){
        super(props);
        console.log(" load NoteClassifyTree");
        this.state={visible:false,y:0,x:0}

        
    }

    componentDidMount = () => {
        const _this = this;
        window.onclick=function(){
            _this.setState({visible:false})
        }
    }
    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }else{
           //return <TreeNode {...item} dataRef={item}>
            return <TreeNode title={<span>{item.title}  <Icon type="right" /></span>} key={item.key} dataRef={item} />;
        }
        
    })
    onRightClick = ({event,node}) => {
        console.log(event.pageX,event.pageY)
        this.setState({
            visible:true,
            y:event.clientY,
            x:event.clientX
        })
        this.props.onRightClick({event,node});
    }
    render(){


        const menu = (
            <Menu >
              <Menu.Item key="1">1st menu item</Menu.Item>
              <Menu.Item key="2">2nd menu item</Menu.Item>
              <Menu.Item key="3">3rd menu item</Menu.Item>
              <SubMenu title="disabled sub menu" >
                <Menu.Item>5d menu item</Menu.Item>
                <Menu.Item>6th menu item</Menu.Item>
                </SubMenu>
            </Menu>
        );
        var _this = this;
        const menuStyle = {
            display:_this.state.visible ? "block" : "none",
            position:"absolute",
            top:_this.state.y,
            left:_this.state.x,
            border:"1px solid red"
        }
        return (
            <div >
                
                <Tree 
                    showLine
                    onRightClick={this.onRightClick}
                    loadData={this.onLoadData} 
                >
                    {this.renderTreeNodes(this.props.treeData)}
                </Tree>
                <div style={menuStyle}>
                {menu}
                </div>
                <Dropdown overlay={menu} >
                        <a className="ant-dropdown-link" href="#">xxx</a>
                    </Dropdown>
            </div>
        )
    }
}

export {NoteClassifyTree as NoteClassifyTree}