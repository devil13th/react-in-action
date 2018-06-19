
import React from 'react';
import { Layout,Divider ,Row,Col} from 'antd';
import {BaseInfo} from './BaseInfo';
import {Transfer} from './Transfer';
import {SearchEnity} from './SearchEnity';
import {connect} from 'react-redux'
const {  Sider } = Layout;
import { Scrollbars } from 'react-custom-scrollbars';

class DataViewLayout extends React.Component {
    constructor(props){
        super(props);
    }



    render(){
        return(
            
            <div style={{height:"100%"}}>
                <Scrollbars 
                    autoHide
                    style={{width: "100%",height:"100%",boxSizing: 'content-box'}}
                >
                    <div style={{background:"#fff",padding:"0px"}}>
                        <Divider orientation="left">基本信息</Divider>
                        {/*<h5>基本信息</h5>*/}
                        <BaseInfo/>
                    </div>
                    <div  style={{background:"#fff"}}>
                        <Divider orientation="left">数据集信息</Divider>
                        {/*<h5>数据集信息</h5>*/}
                        <Row>
                            <Col span={8} offset={2}>
                                <SearchEnity ></SearchEnity>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={20} offset={2}>
                                <Transfer></Transfer>
                            </Col>
                        </Row>
                    </div>
                </Scrollbars>
            </div>
            
        )
    }
}

const mapStateToProps = (state,props) => {
    var moduleState = state.dataViewReducer;
    return {
        //enityList : (function(){ return state.enityList })(),
        //dataCollectionList : state.dataCollectionList
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {

    }
}

const DataViewLayoutComponent = connect(mapStateToProps,mapDispatchToProps)(DataViewLayout);

export { DataViewLayoutComponent as DataViewLayout };





