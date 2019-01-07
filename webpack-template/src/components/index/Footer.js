import React from 'react';
import { Layout} from 'antd';
const {Footer:AntdFooter} = Layout;




class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <AntdFooter {...this.props}>
                {this.props.children}
            </AntdFooter>
        )
    }
}

export default Footer;