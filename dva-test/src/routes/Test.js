import React from 'react';
import { connect } from 'dva';
import {Bton} from '../components/test/Bton';
import {Tab} from '../components/test/Tab';
import {Time} from '../components/test/Time'
import {TimeForm} from '../components/test/TimeForm';
import {Button,Divider,Card,Timeline ,Modal} from 'antd';
const ButtonGroup = Button.Group;

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

  closeTimeModal = () => {
    this.props.dispatch({
      type:'testData/mergeStage',
      payload:{
        timeModalVisible:false
      }
    })
  }

  showTimeModal = () => {
    this.props.dispatch({
      type:'testData/mergeStage',
      payload:{
        timeModalVisible:true
      }
    })
  }

  saveTimeObj = (obj) => {
    this.props.dispatch({
      type:'testData/addTime',
      payload:obj
    })
  }

  deleteTime = (key) => {
    this.props.dispatch({
      type:'testData/deleteTime',
      payload:key
    })
  }


  render(){
    const _this = this;
    return(
      <div>



        <Divider> test01 </Divider>
          
            <Bton 
              btonType={this.props.testData.btonType} 
              btonSize={this.props.testData.btonSize}
              onBtonClick={this.changeBton}
            >
            </Bton>
          
        

        
        <Divider > test02 </Divider >
          
            <Tab
              tabActivitiKey={this.props.testData.tabActivitiKey}
              onTabChange={this.onTabChange}
            ></Tab>
            <br/>
            <ButtonGroup>
              <Button type={this.props.testData.tabActivitiKey == 'a' ? "primary" : "default"} onClick={function(){_this.onTabChange("a")}}> a </Button>
              <Button type={this.props.testData.tabActivitiKey == 'b' ? "primary" : "default"} onClick={function(){_this.onTabChange("b")}}> b </Button>
              <Button type={this.props.testData.tabActivitiKey == 'c' ? "primary" : "default"} onClick={function(){_this.onTabChange("c")}}> c </Button>
            </ButtonGroup>
        

        <Divider > test03 </Divider >

            <Button type="primary" onClick={this.showTimeModal}>添加</Button>
            <Divider type="horizontal"></Divider>
            <Time 
              deleteTime =  {this.deleteTime}
              data={this.props.testData.timeLineData}
            >
            </Time>

            
          
        
        <Divider ></Divider >

        <Modal
          title="Time Info"
          visible={this.props.testData.timeModalVisible}
          onOk={this.closeTimeModal}
          onCancel={this.closeTimeModal}
          footer={null}
        >
          <TimeForm
            saveTimeObj = {this.saveTimeObj}
            closeTimeModal = {this.closeTimeModal}
          >
          </TimeForm>
        </Modal>
        



      </div>
    )
  }
}


export default connect(({testData}) => ({
  testData
}))(Test);
