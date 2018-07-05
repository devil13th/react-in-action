import React from 'react';
import {FormList} from '../components/FormList';
import {Toolbar} from '../components/Toolbar';
import {SelectMainEntity} from '../components/SelectMainEntity';
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
            customFormloading:false,
            entityModalvisible:false,
            selectedMainEntityKeys:[],
            mainEntityData : []
        }
        this.loadCustomFormData = this.loadCustomFormData.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
        this.showSelectMainEntityModal = this.showSelectMainEntityModal.bind(this);
    }

    showCustomForm = (sysformId) => {
        //alert(sysformId)
        this.setState({visible:true});
        this.loadCustomFormData(sysformId);
    }

    closeSelectMainEntityModal = () => {
        this.setState({
            selectedMainEntityKeys:[],
            entityModalvisible :false
        })

    }

    closeCustomForm = () => {
        this.setState({visible:false});
    }

    showSelectMainEntityModal = (id) => {


        
        var _this = this;
        
        _this.setState({
            entityModalvisible:true,
            mainEntityData:null
        })

        //  http://127.0.0.1:8000/vh/api/form/queryAllVadpDomainModel
        //  /proxy/api/form/queryAllVadpDomainModel
        fetch('/proxy/api/form/queryAllVadpDomainModel', { // 在URL中写上传递的参数
            method: 'GET'
        })
        .then((res)=>{
            return res.text();
        })
        .then((res)=>{
            //console.log(res);
            //alert(res)
            var data = JSON.parse(res);
            
            _this.setState({
                mainEntityData : data
            })
        })


        
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


    onSelectedMainEntityKeys = (record, selected, selectedRows, nativeEvent) => {
        //console.log(record)
        //console.log(selected)
        //console.log(selectedRows)
        this.setState({
            selectedMainEntityKeys :[record.key]
        })
    }

    setMainEntity = () => {
        alert(this.state.selectedMainEntityKeys[0])
        this.closeSelectMainEntityModal();
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
                    onSelectMainEntityModal={this.showSelectMainEntityModal}
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


                <Modal
                    title="设置主实体"
                    visible={this.state.entityModalvisible}
                    onCancel={this.closeSelectMainEntityModal}
                    onOk={this.setMainEntity}
                    okText="确定"
                    cancelText="取消"
                    width="80%"
                >
                
                    <SelectMainEntity
                        onSelectedMainEntityKeys = {this.onSelectedMainEntityKeys}
                        selectedMainEntityKeys={this.state.selectedMainEntityKeys}
                        data = {this.state.mainEntityData}
                    >
                    </SelectMainEntity>
                    
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