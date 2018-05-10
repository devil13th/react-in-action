import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

class App extends React.Component{
    constructor(props ){
        super(props);
    }
    render(){
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><Link to="/Layout1">Layout1</Link></li>
                    <li><Link to="/Layout2">Layout2</Link></li>
                    <li><Link to="/Layout3">Layout3</Link></li>
                    <li><Link to="/Layout4">Layout4</Link></li>
                    <li><Link to="/Modal1">Modal1</Link></li>
                    
                </ul>
            </div>
        );
    }
}



export {App as App};