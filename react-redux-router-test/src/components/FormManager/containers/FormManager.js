import React from 'react';
import {FormList} from '../components/FormList';
import {Toolbar} from '../components/Toolbar';
import {connect} from 'react-redux';
import { Modal,message} from 'antd';
import {CustomFormList} from '../components/CustomFormList'
class FormManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            customFormData : [],
            customFormCurrentPage:1,
            sysformId:this.props.selectedFormId,
            customFormloading:false
        }
        this.loadCustomFormData = this.loadCustomFormData.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
    }

    showCustomForm = (sysformId) => {
        //alert(sysformId)
        this.setState({visible:true});
        this.loadCustomFormData(sysformId);
    }

    closeCustomForm = () => {
        this.setState({visible:false});
    }




    deleteForm = (formId) =>{
        const _this = this;
        

        this.setState({
            customFormloading:true
        })

        //alert(formId)
      
        fetch(`/proxy/api/form/deleteVadpViewModelCustom?viewId=${formId}`,       
        {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
            })
        }).then(function(res){
            if(res.status != "200"){
                message.error("操作失败");
                _this.setState({
                    customFormloading:false
                })
            }
            return res.text();
        }).then(function(data){
            data = JSON.parse(data);
            console.log(data);
            if(data.status == "SUCCESS"){
                message.success("操作成功");
                _this.setState({
                    customFormloading:false
                })
            }else{
                message.error("操作失败");
                _this.setState({
                    customFormloading:false
                })
            }
          
            _this.loadCustomFormData(_this.props.selectedFormId);
        })
    }

    loadCustomFormData = (sysformId) => {
        
        this.setState({
            customFormLoading : true
        })
        const _this = this;
        //.get(`/proxy/api/form/queryDataByPage?currentPage=${currentPage}&pageSize=${pageSize}&tp=${condition}`)
        //fetch("/proxy/form/customFormList?formId=" +sysformId+ "&_r=" + Math.random(),{ 
        fetch(`/proxy/api/form/queryCustomVM?viewId=${sysformId}&_r=${ Math.random()}`,{ 

            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
            })
        }).then(function(res){
            
            if(res.status != "200"){
                throw new Error("数据获取失败");
                _this.setState({
                    customFormloading:false
                })
            }
            return res.text();
        }).then(function(data){
            //alert(data)
            data = JSON.parse(data);
            console.log(data);

            _this.setState({
                customFormData:data.result,
                customFormloading:false
            })
        }).catch(function(e){
            message.error(e.message);
            //获取数据失败后关闭模态窗口
            _this.setState({
                visible : false,
                customFormloading:false
            })
        })
    }

    render(){
        return  (
            <div  style={{background:'#fff'}}>
                <div style={{padding:16}}>
                    <Toolbar formDataType={this.props.formDataType}></Toolbar>
                </div>
                <FormList 
                    formDataType={this.props.formDataType}
                    formData={this.props.formData}
                    selectedFormId={this.props.selectedFormId}
                    loading={this.props.loading}
                    showCustomForm={this.showCustomForm}
                >
                </FormList>

                <Modal
                    title="自定义表单"
                    visible={this.state.visible}
                    onCancel={this.closeCustomForm}
                    footer={false}
                   
                    width="80%"
                >
                
                    <CustomFormList
                        formData={this.state.customFormData}
                        currentPage = {this.state.customFormCurrentPage}
                        deleteForm = {this.deleteForm}
                        sysformId = {this.state.selectedFormId}
                        loading={this.state.customFormloading}
                        //selectedFormIds={this.props.selectedCustomFormIds}
                        //loading={this.state.customFormLoading}

                    >
                    </CustomFormList>
                    
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    const moduleState = state.formManagerReducer;
    return{
        loading: moduleState.formTableLoading,
        formData : moduleState.formData,
        selectedFormId : moduleState.selectedFormId,
        formDataType:moduleState.formDataType
    }
}

const dispatchToProps = (dispatch,ownProps) => {
    return{
        
    }
}

const FormManagerContainer = connect(mapStateToProps,dispatchToProps)(FormManager);
export {FormManagerContainer as FormManager}