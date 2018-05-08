import React,{Component} from 'react';
import ReactDOM from 'react-dom';
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
        console.log(this.state)
        //找到子组件的DOM
        ReactDOM.findDOMNode(this.refs[x]);
        
        //循环子组件
        Object.values(this.refs).forEach((element)=>{
            element.close()
        });
        /*for(var pro in this.refs){
            this.refs[pro].close();
        }*/
       
        //找到子组件,并调用其方法
        this.refs[x].open();

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
            let k = "tab_"+ item.index;
            let _this = this;
            let ref = "tab_"+ item.index;
            //doms.push(<ThdTabContainerSingle clickCb={this.fnA} key={k} tit={item.tit} index={item.index}>{item.content}</ThdTabContainerSingle>);
            let open = true;
            if(x == 0){
                open = false;
            }
            doms.push(
                <ThdTabContainerSingle 
                ref={ref} 
                open={open} 
                clickCb={()=>{_this.fnA(k)}} 
                key={k} 
                tit={item.tit} 
                index={item.index}>
                    {item.content}
                </ThdTabContainerSingle>);
        })
     
        return (<div>{doms}</div>);
    }
}


export {ThdTabSingle};