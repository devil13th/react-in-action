import React from 'react';
import { Modal, Button ,Form,Input,DatePicker,message} from 'antd';
import moment from 'moment';
import { Select } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class SysUserForm extends React.Component{
    constructor(props){
        super(props);
       
    }

    handleOk = () => {
        const {form} = this.props;
        form.validateFields((err, values) => {
            console.log(values);
            if (!err) {

                if(this.props.sysUserInfo && this.props.sysUserInfo.userId){//编辑
                    console.log("edit")
                    
                    //alert(values.userBirthday.format('x'));
                    this.props.updateSysUserInfo({
                        ...values,
                        userId:this.props.sysUserInfo.userId,
                        userBirthday:values.userBirthday.format('x')
                    });
                }else{//新增
                    console.log("add")
                    this.props.saveSysUserInfoTemp(values);
                }

            }else{
                message.error("请根据错误提示进行修改",3);
            }
        });

        

    }


	//自定义校验规则
    validatename =(rule, value, callback)=>{
        if(value == '' || value == null ){
            callback('请填写名称');
        }else{
            callback();
        }
    };




    componentDidMount = () => {
        this.props.searchOrg("");
    }

    //为了防止搜索后点开其他数据后下拉菜单是id的情况
    onSelectedBlur = () => {
        this.props.searchOrg("");
    }

    handleSearch = (value) => {
        this.props.searchOrg(value);
    }

    handleChange = (value) => {
       
    }

    render(){

        //console.log(this.props.sysUserInfo)

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };

        const {getFieldDecorator} = this.props.form;
        const sysUser = this.props.sysUserInfo;
        //console.log(this.props.sysOrgData);
        const orgOptions =  this.props.sysOrgData.map(function(item){
            return (<Option key={item.org_id}>{item.org_name}</Option>)
        })
        
        return(
            <Modal
                title={this.props.modalTitle || "用户信息"}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCloseModal}
                defaultActiveFirstOption={false}
                width={800}
                destroyOnClose={true}
                confirmLoading={this.props.saveLoading}
                maskClosable={false}
            >

                
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                    >
                        {
                            getFieldDecorator('userName', {
                                initialValue:sysUser.userName,
                                rules: [{
									validator: this.validatename
								}],
                            })(
                                <Input autoComplete={false}/>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="电话"
                    >
                        {
                            getFieldDecorator('userTel', {
                                initialValue:sysUser.userTel,
                                rules: [
                                    {
                                        required: true, message: 'Please input your tel!',
                                    },
                                    {
                                        max: 20, message: '最小长度为20!',
                                    }
                                ],
                            })(
                                <Input autoComplete={false}/>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {
                            getFieldDecorator('userMail', {
                                initialValue:sysUser.userMail,
                                rules: [
                                    {
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, 
                                    {
                                        required: true, message: 'Please input your E-mail!',
                                    }
                                ],
                            })(
                                <Input autoComplete={false}/>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="生日"
                    >
                        {
                            getFieldDecorator('userBirthday', {
                                initialValue: sysUser.userBirthday ? moment(sysUser.userBirthday, 'YYYY-MM-DD') : null,
                                rules: [
                                    {
                                        required: true, message: 'Please input your birthday!',
                                    }
                                ],
                            })(
                                <DatePicker format="YYYY-MM-DD"/>
                            )
                        }
                    </FormItem>

                    

                    <FormItem
                        {...formItemLayout}
                        label="组织机构"
                    >
                        {
                            getFieldDecorator('orgId', {
                                initialValue:sysUser.orgId,
                                rules: [
                                    {
                                        type: 'string', message: '请选择组织机构!',
                                    }, 
                                    {
                                        required: true, message: '请选择组织机构!',
                                    }
                                ],
                            })(
                                <Select
                                    showSearch
                                    allowClear={true}
                                    style={{ width: 200 }}
                                    placeholder="Select a org"
                                    onSearch={this.handleSearch}
                                    filterOption={false}
                                    notFoundContent="未找到"
                                    onBlur={this.onSelectedBlur}
                                    
                                >
                                    {orgOptions}
                                </Select>
                            )
                        }
                    </FormItem>

                </Form>

            </Modal>
            
        )        
    }
}

const WrappedSysUserForm = Form.create({

    onFieldsChange(props, fields) {
        //console.log(props.saveSysUserInfoTemp)
        //console.log(fields);
        //console.log('onFieldsChange', fields);
        /*props.dispatch({
          type: 'sysUser/mergeState',
          payload: fields,
        });*/
    },
    onValuesChange(props, changedValues, allValues){
        
        console.log(allValues);
        //调用dispatch
        //props.saveSysUserInfoTemp(allValues);
    }

})(SysUserForm);

export {WrappedSysUserForm as SysUserForm}

