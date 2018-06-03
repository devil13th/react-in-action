import React from 'react';
class Repeat extends React.Component{
    //构造函数
    constructor(props){
        super(props);
        console.log("[Repeat  " + this.props.content + "]constructor");
        
       this.state = {
        content : this.props.content
       }

    }
    //设置默认的props，也可以用dufaultProps设置组件的默认属性.  该方法在class写法中不能调用

    /*getDefaultProps(){
        console.log("getDefaultProps");
    }*/

    /*在使用es6的class语法时是没有这个钩子函数的，
    可以直接在constructor中定义this.state。
    此时可以访问this.props
    该方法在class写法中不能调用*/

    /*getInitialState(){
        console.log("getInitialState");
    }*/
    //组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
    componentWillMount(){
        console.log("[Repeat  " + this.props.content + "]componentWillMount");
    }
    //react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
    componentDidMount(){
        console.log("[Repeat  " + this.props.content + "]componentDidMount");
    }
    //组件渲染之后调用，只调用一次。
    componentWillReceiveProps(nextProps){
        console.log("[Repeat  " + this.props.content + "]componentWillReceiveProps");
    }
    //组件初始化时不调用，组件接受新的props时调用。
    //该方法必须返回boolean否则会报警
    shouldComponentUpdate(nextProps, nextState){
        console.log("[Repeat  " + this.props.content + "]shouldComponentUpdate");
        return true;
    }
    //组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
    componentWillUpdate(nextProps, nextState){
        console.log("[Repeat  " + this.props.content + "]componentWillUpdate");
    }
    //组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
    componentDidUpdate(){
        console.log("[Repeat  " + this.props.content + "]componentDidUpdate");
    }
    //组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
    componentWillUnmount(){
        console.log("[Repeat  " + this.props.content + "]componentWillUnmount");
    }




   
    //组件渲染
    render(){
        console.log("[Repeat " + this.props.content + "] render");
        return(
            <div>
                {this.props.content}
            </div>
        )
    }
}

export {Repeat as Repeat}