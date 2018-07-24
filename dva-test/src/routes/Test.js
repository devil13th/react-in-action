import React from 'react';
import { connect } from 'dva';
import {Bton} from '../components/test/Bton';
import {Tab} from '../components/test/Tab';
import {Button,Divider,Card,Timeline  } from 'antd';


class Test extends React.Component{
  constructor(props){
    super(props);
    
    //从props对象中获取dispatch属性
    const {dispatch} = this.props;
    this.dispatch = dispatch;

  }

  changeBton = () => {

    let btonStatus = {
      btonSize : this.props.testData.btonSize == 'large' ? "small" : "large",
      btonType : this.props.testData.btonType == 'primary' ? "danger" : "primary"
    }

    this.props.dispatch({
      type:'testData/mergeStage',
      payload:btonStatus
    })

  }

  onTabChange = (tabKey) => {
    this.props.dispatch({
      type:'testData/mergeStage',
      payload:{
        tabActivitiKey:tabKey
      }
    })
  }


  render(){
    const _this = this;
    return(
      <div>



        <Card title="test01" >
          <p>
            <Bton 
              btonType={this.props.testData.btonType} 
              btonSize={this.props.testData.btonSize}
              onBtonClick={this.changeBton}
            >
            </Bton>
          </p>
        </Card>

        
        <Card title="test02" >
          <p>
            <Tab
              tabActivitiKey={this.props.testData.tabActivitiKey}
              onTabChange={this.onTabChange}
            ></Tab>
            <br/>
            <Button type={this.props.testData.tabActivitiKey == 'a' ? "primary" : "default"} onClick={function(){_this.onTabChange("a")}}> a </Button>
            <Button type={this.props.testData.tabActivitiKey == 'b' ? "primary" : "default"} onClick={function(){_this.onTabChange("b")}}> b </Button>
            <Button type={this.props.testData.tabActivitiKey == 'c' ? "primary" : "default"} onClick={function(){_this.onTabChange("c")}}> c </Button>
          </p>
        </Card>

      </div>
    )
  }
}


export default connect(({testData}) => ({
  testData
}))(Test);
