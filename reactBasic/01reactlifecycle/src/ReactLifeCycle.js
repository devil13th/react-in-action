import React from 'react';
import ReactLifeCycleComponent from './ReactLifeCycleComponent'

class ReactLifeCycle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"ReactLifeCycle",
            ct:0
        }

        console.log(`[${this.state.name}] constructor`);
    }

    componentWillMount = () => {
        console.log(`[${this.state.name}] componentWillMount`);
    }

    componentDidMount(){
        console.log(`[${this.state.name}] componentDidMount`);
    }

    componentWillReceiveProps(){
        console.log(`[${this.state.name}] componentWillReceiveProps`);
    }

    componentWillUnmount(){
        console.log(`[${this.state.name}] componentWillUnmount`);
    }

    componentWillUpdate(){
        console.log(`[${this.state.name}] componentWillUpdate`);
    }

    componentDidUpdate(){
        console.log(`[${this.state.name}] componentDidUpdate`);
    }

    shouldComponentUpdate(){
        console.log(`[${this.state.name}] shouldComponentUpdate`);
        return true;
    }

    add = () => {
        var x = this.state.ct;
        x++;
        this.setState({ct:x});
    }

    subtract = () => {
        var x = this.state.ct;
        x--;
        this.setState({ct:x});
    }


    render(){
        /**
         * 以下两个组件会随着state.ct变化,
         * 请注意下面两个组件的根节点，一个是li  一个是div
         * 由 state.ct % 2 == 1 决定渲染哪个组件
         * 验证了 根节点变换后(li->div 或 div->li)后下面的组件会被销毁并重新创建
         */
        console.log(`[${this.state.name}] render`);
        let component = <li><ReactLifeCycleComponent
            ct={this.state.ct}
            add={this.add}
            subtract = {this.subtract}
        ></ReactLifeCycleComponent></li>;

        let component2 = <div><ReactLifeCycleComponent
            ct={this.state.ct}
            add={this.add}
            subtract = {this.subtract}
        ></ReactLifeCycleComponent></div>;


        return (
            <div>
                {this.state.ct % 2 == 1 ? component : component2}
            </div>
        )
    }

}

export default ReactLifeCycle;
