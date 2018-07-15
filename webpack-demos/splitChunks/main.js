import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

class Demo extends React.Component{

    render(){
        return <div>
            <h1>{this.props.children}</h1>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
            
        </div>
    }
}

ReactDOM.render(
    <Demo>Split Chunks</Demo>,
    document.getElementById('example')
);
/*

function aaa(){

    alert("2");
    for(var i = 0 , j = 4 ; i < j ; i++){
        alert(i)
    }
}

var a = {
    c:1,
    b:2
}

var b = {...a,c:4}

const d = (x) => {

    console.log(x)
}*/