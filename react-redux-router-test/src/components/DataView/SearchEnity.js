
import React from 'react';
import {Tooltip, Row,Col, Icon, Input} from 'antd';
const Search = Input.Search;

class SearchEnity extends React.Component {
    constructor(props){
        super(props);
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

export { SearchEnity as SearchEnity};





