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
            payload:{a:1,b:3}
        });
    }

    render(){
        return(
            <SysUserTable
                dataSource = {this.props.sysUser.dataSource} 
            >
            </SysUserTable>
        )
    }
}


export default connect(({sysUser}) => ({
    sysUser
  }))(SysUser);