import React from 'react';
import { routerRedux, Route,Switch,Link } from 'dva/router';
import AntdIndex from '../components/antd/AntdIndex';
import AntdIndex2 from '../components/antd/AntdIndex2';
import AntdIndex3 from '../components/antd/AntdIndex3';
const { ConnectedRouter } = routerRedux;


class AntdRouter extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            
                <div>
                    
                        <Route exact path="/" component={AntdIndex} />
                        <Route  path="/x2" component={AntdIndex2} />
                        <Route  path="/x3" component={AntdIndex3}/>
                        
                    
                </div>
           
        )
    }
}

export default AntdRouter;