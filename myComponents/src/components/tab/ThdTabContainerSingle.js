import React,{Component} from 'react';


class ThdTabContainerSingle extends React.Component{
    constructor(props){
        super(props);

        //事件bind this对象
        this.open = this.open.bind(this);

        this.state={
            open : this.props.open ? false : true,
            title : this.props.tit,
            index : this.props.index
        };
    }

    open(){
        console.log("open()");
        this.setState({open:true});
    }
    
    close(){
        console.log("close()");
        this.setState({open:false});
    }

    render(){
        const contentStyle = {
            color:"red",
            border:"1px solid green",
            padding:"15px",
            display: this.state.open ? "block" : "none"
        }
        const titleStyle = {
            border:"1px solid gray",
            cursor:"pointer",
            fontWeight:"bold"
        }


        const thdTabContainerStyle = {
            marginTop:"5px"
        }
        return (
            <div style={thdTabContainerStyle} >
                <div style={titleStyle} onClick={this.props.clickCb}>{this.props.tit}</div>
                <div style={contentStyle}>{this.props.children}</div>
            </div>
        );
    }
}

export {ThdTabContainerSingle};