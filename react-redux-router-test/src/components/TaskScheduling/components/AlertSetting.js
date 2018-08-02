import React from 'react';
import { Button,Select,Checkbox,Input } from 'antd';
const Option = Select.Option;


function Trim(str){ 
 return str.replace(/(^\s*)|(\s*$)/g, ""); 
}


class AlertSetting extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    mailFilter(inputValue, option){
        return (option.props.children.toLocaleUpperCase().indexOf(Trim(inputValue).toLocaleUpperCase()) > -1)
    }

    telFilter(inputValue, option){
        return (option.props.children.toLocaleUpperCase().indexOf(Trim(inputValue).toLocaleUpperCase()) > -1)
    }

 
    render(){

        const mailData = this.props.emailData;

        const mailchildren = []
        for (let i = 0; i < mailData.length; i++) {
            mailchildren.push(<Option key={mailData[i].mail_id}>{mailData[i].mail}</Option>);
        }



        const telData = this.props.telData;

        const telchildren = []
        for (let i = 0; i < telData.length; i++) {
            telchildren.push(<Option key={telData[i].phone_id}>{telData[i].phone}</Option>);
        }

        console.log(this.props.mailDefaultValue);
        console.log(this.props.telDefaultValue);

        console.log(mailData);
        console.log(telData);

        return (
            
            <div>
                <Checkbox onChange={this.props.onJobStartFlagChange} checked={this.props.jobStartFlag}>任务启动时</Checkbox>
                <Checkbox onChange={this.props.onJobEndFlagChange} checked={this.props.jobEndFlag}> JOB执行完</Checkbox>
                <Checkbox onChange={this.props.onExceptionToGoChange} checked={this.props.exceptionToGo}> 系统运行时抛出例外</Checkbox>
                系统单次运行时长超过阈值：<Input style={{width:70}} onChange={this.props.onTimeThresholdChange} value={this.props.timeThreshold}/>值
                <br/><br/>
                邮件设置<br/><br/>
                <Select
                    key="mailSelect"
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={this.props.mailDefaultValue}
                    filterOption={this.mailFilter}
                    onChange = {this.props.onMailChange}
                    
                >
                    {mailchildren}
                </Select>
                <br/><br/>
                短信设置<br/><br/>
                <Select
                    key="mailTel"
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={this.props.telDefaultValue}
                    filterOption={this.telFilter}
                    onChange = {this.props.onTelChange}
                    
                >
                    {telchildren}
                </Select>

            </div>
        )
    }
}

export {AlertSetting as AlertSetting};