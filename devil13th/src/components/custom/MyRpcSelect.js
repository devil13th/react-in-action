import React from 'react';
import {Select,Tooltip} from 'antd';
import rpc from '../../utils/rpc';
const Option = Select.Option;
class MyRpcSelect extends Select{
    constructor(props){
        super(props);
        this.state = {
            dataSource : [],
            keyColumn : props.keyColumn ,
            valueColumn : props.valueColumn,
            tableName : props.tableName
        }
    }

    makeOptions = () => {
        const options = this.state.dataSource.map(function(item){
            return (
                <Option key={item.k} value={item.k}>
                    <Tooltip title={item.v + "(" + item.k + ")"} key={item.k}>
                        {item.v}({item.k})
                    </Tooltip>
                </Option>
            )
        })
        return options;
    }

    componentDidMount = () => {
        const _this = this;

        const {tableName,keyColumn,valueColumn} = this.state;
        rpc.fetch("/infrastructure/common/querySelectDataSource", {kw:"",tableName,keyColumn,valueColumn})
        .then(function(data){
            //console.log('------------');
            //console.log(ddd);
            _this.setState({
                dataSource : data.result
            })
        });
        
    }

    onSearch = (kw) => {
        const _this = this;
        const {tableName,keyColumn,valueColumn} = this.state;
        rpc.fetch("/infrastructure/common/querySelectDataSource", {kw,tableName,keyColumn,valueColumn})
        .then(function(data){
            //console.log('------------');
            //console.log(data);
            _this.setState({
                dataSource : data.result
            })
        });
    }

    render(){
        const selectProp = {
            ...this.props,
            showSearch:true,
            filterOption:false,
            onSearch:this.onSearch
        }

        const opts = this.makeOptions();
        
        console.log(selectProp)
        

        return (
            <Select {...selectProp}>
                {opts}
            </Select>
        )
    }
}

export default MyRpcSelect;