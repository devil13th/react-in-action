import React from 'react';
import {FormList} from '../components/FormList';
import {Toolbar} from '../components/Toolbar';
import {connect} from 'react-redux';

class FormManager extends React.Component{
    constructor(props){
        super(props);
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
                >
                </FormList>
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