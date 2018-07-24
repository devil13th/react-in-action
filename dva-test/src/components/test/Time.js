import { Timeline ,Icon,Button,Popconfirm} from 'antd';
import React from 'react';

class Time extends React.Component{
  constructor(props){
    super(props);
  }
  

  onConfirm = (key) => {
      this.props.deleteTime(key);
  }
  render(){

    const _this = this;
    const data = this.props.data;
    const items = [];
    if(data && data.length > 0 ){
        data.map((obj) => {
            const itemkey = obj.key
            let item = (
                <Timeline.Item key={obj.key} dot={<Icon type={obj.icon ? obj.icon : "clock-circle-o"} style={{ fontSize: '16px' }} />} color="green">
                    <p >
                        {obj.time}  
                        &nbsp;
                        <Popconfirm placement="topLeft" title="确定删除?"  onConfirm={function(){ _this.onConfirm(obj.key) }} okText="是" cancelText="否">
                            <Button size="small" type="primary" shape="circle" icon="close" />
                        </Popconfirm>

                    </p>
                    <p>{obj.text}</p>
                </Timeline.Item>
            )

            items.push(item);
        })
    }


    return(
        <Timeline  pending="Recording..." reverse={true}>
            {items}
            <Timeline.Item key="a" color="green">
                Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item key="b" color="green">
                Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item key="c" dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item key="d">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
            </Timeline.Item>
        </Timeline>
    )
  }
}


export {Time as Time}