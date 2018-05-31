
import React from 'react';
import { Layout,Divider ,Row,Col} from 'antd';
import {BaseInfo} from './BaseInfo';
import {Transfer} from './Transfer';
import {SearchEnity} from './SearchEnity';
import {connect} from 'react-redux'
const { Header, Footer, Sider, Content } = Layout;


class DataViewLayout extends React.Component {
    constructor(props){
        super(props);

        
    }
    render(){
        return(
            <Layout style={{height:"100%"}}>
                <Header style={{background:"#fff",padding:"0px",height:"auto"}}>
                    <Divider orientation="left">基本信息</Divider>
                    <BaseInfo/>
                </Header>
                <Content  style={{background:"#fff"}}>
                    <Divider orientation="left">数据集信息</Divider>
                    
                    <Row>
                        <Col span={8} offset={2}>
                            <SearchEnity></SearchEnity>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={20} offset={2}>
                            <Transfer ></Transfer>
                        </Col>
                    </Row>


                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        enityList : (function(){ return state.enityList })(),
        dataCollectionList : state.dataCollectionList
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {

    }
}

const DataViewLayoutComponent = connect(mapStateToProps,mapDispatchToProps)(DataViewLayout);

export { DataViewLayoutComponent as DataViewLayout };





