
import React from 'react';
import {Tooltip, Row,Col, Icon, Input} from 'antd';
import {connect} from 'react-redux'
import {createSearchDataViewEnityAction} from './action'
const Search = Input.Search;

class SearchEnity extends React.Component {
    constructor(props){
        super(props);
        this.onQueryEnity = this.onQueryEnity.bind(this);
        
    }

    onQueryEnity(kw){
        //this.props.onSearch(kw);
        this.props.dataViewSearchKeyWord(kw);
    }
   



    render(){
        return(
            <Row>
                <Col span={24} style={{textAlign:"left"}}>
                    <div style={{ marginBottom: 16 }}>
                    <Tooltip title="输入关键字回车后即可查询">
                        <Search
                            placeholder="input search text"
                            size="small"
                            enterButton
                            onSearch={this.onQueryEnity}
                           
                           
                        />
                    </Tooltip>
                    </div>
                </Col>
            </Row>
        )
    }
}


const mapStateToProps = (state,props) => {
    var moduleState = state.dataViewReducer;
    return {
        
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        dataViewSearchKeyWord : (dataViewSearchKeyWord) => {
            dispatch(createSearchDataViewEnityAction(dataViewSearchKeyWord))
        }
    }
}

const SearchEnityComponent = connect(mapStateToProps,mapDispatchToProps)(SearchEnity);


export { SearchEnityComponent as SearchEnity};





