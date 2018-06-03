import React from 'react';
class Lifecycle extends React.Component{
    //构造函数
    constructor(props){
        super(props);
        console.log("[Lifecycle]constructor");
        
        this.state ={
            ct : this.props.ct
        }

    }
  
    //组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
    componentWillMount(){
        console.log("[Lifecycle]componentWillMount");
    }
    //react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
    componentDidMount(){
        console.log("[Lifecycle]componentDidMount");
    }
    
    //组件渲染之后调用，只调用一次。
    componentWillReceiveProps(nextProps){
        console.log("[Lifecycle]componentWillReceiveProps");
    }
    //组件初始化时不调用，组件接受新的props时调用。
    //该方法必须返回boolean否则会报警
    shouldComponentUpdate(nextProps, nextState){
        console.log("[Lifecycle]shouldComponentUpdate");
        return true;
    }
    //组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
    componentWillUpdate(nextProps, nextState){
        console.log("[Lifecycle]componentWillUpdate");
    }
    //组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
    componentDidUpdate(){
        console.log("[Lifecycle]componentDidUpdate");
    }
    //组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
    componentWillUnmount(){
        console.log("[Lifecycle]componentWillUnmount");
    }




   
    //组件渲染
    render(){
        console.log("[Lifecycle] render");
        return(
            <div>
                <h2>生命周期组件</h2>
                [{this.props.ct}]
            </div>
        )
    }
}

export {Lifecycle as Lifecycle}