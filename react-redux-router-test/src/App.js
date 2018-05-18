import React from 'react';
import Router from './routers/index.js'


class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <Router/>;
    }
}
export default App;