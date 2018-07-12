import React from 'react';
import {DatePicker,Button,Form } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;


class TaskSchedulingTaskManagerSearch extends React.Component{
    constructor(props){
        super(props);
    }

    onSearch = () => {
        const obj = this.props.form.getFieldsValue();
        //console.log(obj)
        const condition = {}
        if(obj.startTime){
            condition.startTime = obj.startTime.format('YYYY-MM-DD');
        }
        if(obj.endTime){
            condition.endTime = obj.endTime.format('YYYY-MM-DD');
        }
        //console.log(condition)
        this.props.onSearch(condition);
    }

    render(){

        const { getFieldDecorator } = this.props.form;

        return(
            <div>
            <Form  layout="inline">
                <FormItem
                    label="执行时间起"
                    >
                    {getFieldDecorator('startTime')(
                        <DatePicker size="small"/>
                    )}
                </FormItem>
                <FormItem
                    label="执行时间止"
                    >
                    {getFieldDecorator('endTime')(
                        <DatePicker  size="small"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        
                        size="small"
                        onClick={this.onSearch}
                    >
                        查询
                    </Button>
                </FormItem>
                
            </Form>
            </div>
        )
    }
}

const WrappedTaskSchedulingTaskManagerSearch = Form.create()(TaskSchedulingTaskManagerSearch);
export {WrappedTaskSchedulingTaskManagerSearch as TaskSchedulingTaskManagerSearch}