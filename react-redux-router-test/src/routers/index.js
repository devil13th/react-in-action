
import React from 'react';
import {Route,BrowserRouter,Switch,IndexRoute} from 'react-router-dom'

import ThdLayout from '../layout/ThdLayout';
import Home from '../components/Home';

class Router extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <div style={{height:"100%"}}>
                    <Route path="/" name="idx" component={ThdLayout} ></Route>
                    
                    
                </div>
            </BrowserRouter>
        )
    }
}

export default Router;
  