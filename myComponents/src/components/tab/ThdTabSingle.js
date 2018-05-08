import React,{Component} from 'react';
import {ThdTabContainerSingle} from './ThdTabContainerSingle.js';

class ThdTabSingle extends React.Component{
    constructor(props){
        super(props);

        //事件bind this对象
        this.fnA = this.fnA.bind(this);

        const data = [];
        for(let i = 0 , j = 5 ; i < j ; i++){
            data.push({tit:"title" + i , content : "content" + i ,index:i});
        }

        this.state={
            data : data,
            currentTab:0
        };

        

    }

    fnA(x){
        this.setState({currentTab:x});
        console.log(this.props.children);
    }
    

    render(){
        const style = {
            color:"red",
            border:"1px solid red",
            padding:"15px"
        }

        var doms = [];
       
        this.state.data.forEach((item,x) =>{
            //console.log(item,x);
            let k = `tab{x}`;
            let _this = this;
            //doms.push(<ThdTabContainerSingle clickCb={this.fnA} key={k} tit={item.tit} index={item.index}>{item.content}</ThdTabContainerSingle>);
            doms.push(<ThdTabContainerSingle clickCb={()=>{_this.fnA(x)}} key={k} tit={item.tit} index={item.index}>{item.content}</ThdTabContainerSingle>);
        })
        //alert(1);
        //console.log(doms);
        

        //console.log(<ThdTabContainerSingle></ThdTabContainerSingle>);
        return (<div>当前打开{this.state.currentTab}<br/>{doms}</div>);
    }
}


export {ThdTabSingle};