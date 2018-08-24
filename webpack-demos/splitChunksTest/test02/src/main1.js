
import React from 'react';
import ReactDOM from 'react-dom';

class MyApp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <h1>   
                Split Code
            </h1>
        )
    }
}


ReactDOM.render(<MyApp/>,document.getElementById("app"));