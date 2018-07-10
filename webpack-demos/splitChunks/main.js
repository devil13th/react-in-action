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