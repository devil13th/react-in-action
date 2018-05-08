import React,{Component} from 'react';

class ThdTab extends React.Component{
    constructor(props){
        super(props);

        //事件bind this对象
        //...

        this.state={currentTab:0};

    }

    

    render(){
        const style = {
            color:"red",
            border:"1px solid red",
            padding:"15px"
        }
        return (<div className="ThdTab" style={style}>{this.props.children}</div>);
    }
}
export {ThdTab};