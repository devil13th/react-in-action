import React from 'react';
import { connect } from 'dva';
import { Modal,Tabs, Icon ,Button,Tooltip,Popconfirm,Breadcrumb,Divider} from 'antd';
import SysDicPubList from './view/SysDicPubList';
import SysDicPubSearch from './view/SysDicPubSearch';
import SysDicPubForm from './view/SysDicPubForm';
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class SysDicPubRouter extends React.Component{
    constructor(props){
        super(props);
        
        
    }

    componentDidMount(){
        this.props.dispatch({
            type:"sysDicPubModel/queryList"
        });
    }


    //分页,排序,筛选改变时触发
    changePageAndSort = (pagination, filters, sorter) => {
        this.props.dispatch({
            type:"sysDicPubModel/setPageAndSort",
            payload:{...pagination,sortColumn:sorter.field,sortOrder:sorter.order}
        })
        
    }



    render(){
 

        const {current,pageSize,total} = this.props.sysDicPubModel.queryBean;
        const queryListLoading = this.props.loading.effects['sysDicPubModel/queryList']
        || this.props.loading.effects['sysDicPubModel/setPageAndSort'];
        return(
            <div className="mainContent">

                <SysDicPubSearch>
                </SysDicPubSearch>
                <SysDicPubList
                    loading={queryListLoading}
                    changePageAndSort={this.changePageAndSort}
                    pagination={{
                        current,pageSize,total
                    }}
                    listDataSource={this.props.sysDicPubModel.listDataSource}
                >

                </SysDicPubList>

                
                <Modal
                    title="公共字典信息"
                    visible={this.props.formVisible}
                    destroyOnClose={true}
                    button={false}
                >
                    <SysDicPubForm
                        onSave={this.saveForm}
                        onCancel={this.closeForm}
                    >
                    </SysDicPubForm>
                </Modal>
                    <div className="ant-popover-content">1</div>
            </div>
        )
    }
}


export default connect(({sysDicPubModel,loading }) => ({
    sysDicPubModel,
    loading 
  }))(SysDicPubRouter);