import React from 'react';
import {Counter} from './Counter'
import {Lifecycle} from './Lifecycle'
import {Repeat} from './Repeat'
import _ from 'lodash'
class LifecycleExample extends React.Component{
    //构造函数
    constructor(props){
        super(props);
        console.log("[Index]constructor");
        this.state = {
            ct : 10,
            componet : "Lifecycle",  //显示哪个组建  Counter ， Lifecycle
            repeatList : [] ,
            wapped:false
        }
        this.onAdd = this.onAdd.bind(this);
        this.showCounter = this.showCounter.bind(this);
        this.showLifecycle = this.showLifecycle.bind(this);
        this.onAddRepeat = this.onAddRepeat.bind(this);
        this.onWappedRepeat = this.onWappedRepeat.bind(this);
    }
   
    //组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
    componentWillMount(){
        console.log("[Index]componentWillMount");
    }
    //react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
    componentDidMount(){
        console.log("[Index]componentDidMount");
    }
    //组件渲染之后调用，只调用一次。
    componentWillReceiveProps(nextProps){
        console.log("[Index]componentWillReceiveProps");
    }
    //组件初始化时不调用，组件接受新的props时调用。
    //该方法必须返回boolean否则会报警
    shouldComponentUpdate(nextProps, nextState){
        console.log("[Index]shouldComponentUpdate");
        return true;
    }
    //组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
    componentWillUpdate(nextProps, nextState){
        console.log("[Index]componentWillUpdate");
    }
    //组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
    componentDidUpdate(){
        console.log("[Index]componentDidUpdate");
    }
    //组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
    componentWillUnmount(){
        console.log("[Index]componentWillUnmount");
    }

    onAdd(){
        this.setState({
            ct:this.state.ct + 1
        })
        
    }

    showCounter(){
        this.setState({
            componet : "Counter"
        })
    }
    showLifecycle(){
        this.setState({
            componet : "Lifecycle"
        })
    }
    onAddRepeat(){
        let l = _.cloneDeep(this.state.repeatList);
        if( l.length % 2 == 0 ){
            l.push(<Repeat key={"repeat_" + (l.length + 1)} content={l.length + 1}></Repeat>)
        }else{
            l = [<Repeat key={"repeat_" + (l.length + 1)} content={l.length + 1}></Repeat>,
            ...l]
        }
        
        this.setState({
            repeatList : l
        })
    }

    onWappedRepeat(){
        this.setState({
            wapped : !this.state.wapped
        })
    }

    //组件渲染
    render(){
        console.log("[Index] render");
        return(
            <div>
                <h1>生命周期例子1 [{this.state.ct}]</h1>
                <input type="button" value="操作Counter +1 " onClick={this.onAdd}/>
                <br/>
               

                {this.state.componet == "Counter" ?  
                <div>
                    <Counter ct={this.state.ct}></Counter>
                    <input type="button" value="切换组建Lifecycle,观察生命周期的console.log"  onClick={this.showLifecycle}/>
                </div> 
                : null}
                {this.state.componet == "Lifecycle" ?  
                <div>
                    <Lifecycle  key={"repeat_1"} ct={this.state.ct}></Lifecycle>
                    <input type="button" value="切换组建Counter,观察生命周期的console.log"  onClick={this.showCounter}/>
                </div> 
                : null}



                <hr/>

                <h1>生命周期例子2 [{this.state.ct}]</h1>
                
                
                <input type="button" value="添加相同组建" onClick={this.onAddRepeat}/>
                <div>{this.state.repeatList.map(item  =>  item)}</div>


                <input type="button" value="添加相同组建后再点我" onClick={this.onWappedRepeat}/>
                {
                    this.state.wapped ? 
                    <li>{this.state.repeatList.map(item  =>  item)}</li> 
                    :
                    <div> {this.state.repeatList.map(item  =>  item)} </div>
                }
                
            </div>
        )
    }
}

export{LifecycleExample as LifecycleExample} 