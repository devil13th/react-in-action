import { Timeline ,Form,Icon,Button,Popconfirm,Input,DatePicker} from 'antd';

import React from 'react';
import moment from 'moment';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

class TimeForm extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.form.setFieldsValue({time:moment("2018-01-01", "YYYY-MM-DD"),text:"some text ..."});
  }
  
  handleSubmit = () => {
    const obj = this.props.form.getFieldsValue();

    const time = {
        time:this.props.form.getFieldValue("time").format('YYYY-MM-DD')
    }


    //console.log({...obj,...time});

    this.props.saveTimeObj({...obj,...time,key:Math.random()});
            
  }


  render(){
    const { getFieldDecorator } = this.props.form;
   
    return(
        <Form >
            <FormItem>
                {getFieldDecorator('time')(
                    <DatePicker format="YYYY-MM-DD"/>
                )}
            </FormItem>
           
            <FormItem>
                {getFieldDecorator('text', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="text" />
                )}
            </FormItem>
            <FormItem style={{textAlign:"right"}}>
                <ButtonGroup>
                    <Button type="default" onClick={this.props.closeTimeModal}>
                        Close 
                    </Button> 
                    <Button type="primary" onClick={this.handleSubmit}>
                        Save 
                    </Button>
                </ButtonGroup>
            </FormItem>
      </Form>
    )
  }
}

const WrappedTimeForm = Form.create()(TimeForm);


export {WrappedTimeForm as TimeForm}