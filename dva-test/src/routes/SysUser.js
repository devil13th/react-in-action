import React from 'react';
import { connect } from 'dva';
import {SysUserTable} from '../components/sysUser/SysUserTable'

class SysUser extends React.Component{
    constructor(props){
        super(props);
        //从props对象中获取dispatch属性
        const {dispatch} = this.props;
        this.dispatch = dispatch;
    }

    componentDidMount(){
        this.dispatch({
            type:"sysUser/getUserData",
            payload:{current:1,pageSize:10}
        });
    }

    queryAllData = (payload) => {
        this.dispatch({
            type:"sysUser/getUserData",
            payload
        });
    }

    render(){
        return(
            <SysUserTable
                dataSource = {this.props.sysUser.dataSource} 
                current = {this.props.sysUser.current}
                pageSize = {this.props.sysUser.pageSize}
                total = {this.props.sysUser.total}
                onChange={this.queryAllData}
            >
            </SysUserTable>
        )
    }
}


export default connect(({sysUser}) => ({
    sysUser
  }))(SysUser);