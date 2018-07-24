import React from 'react';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


class Tab extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
        <Tabs defaultActiveKey="a" activeKey={this.props.tabActivitiKey} onChange={this.props.onTabChange}>
            <TabPane tab="Tab 1" key="a">Content of Tab Pane 1</TabPane>
            <TabPane tab="Tab 2" key="b">Content of Tab Pane 2</TabPane>
            <TabPane tab="Tab 3" key="c">Content of Tab Pane 3</TabPane>
        </Tabs>
    )
  }
}


export {Tab as Tab}