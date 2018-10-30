import React from 'react';
import ReactDom from 'react-dom';

class ReactLifeCycleComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"ReactLifeCycleComponent"
        }
        console.log(`[${this.state.name}] constructor`);
        console.log(props);
    }

    componentWillMount = () => {
        console.log(`[${this.state.name}] componentWillMount`);
        console.log(this.props);
    }

    componentDidMount(){
        console.log(`[${this.state.name}] componentDidMount`);
        console.log(this.props);
    }

    componentWillReceiveProps(newProps){
        console.log(`[${this.state.name}] componentWillReceiveProps`);
        console.log(this.props);
        console.log(newProps);
    }

    componentWillUnmount(){
        console.log(`[${this.state.name}] componentWillUnmount`);
        console.log(this.props);
    }

    componentWillUpdate(newProps){
        console.log(`[${this.state.name}] componentWillUpdate`);
        console.log(this.props);
        console.log(newProps);
    }

    componentDidUpdate(oldProps){
        console.log(`[${this.state.name}] componentDidUpdate`);
        console.log(this.props);
        console.log(oldProps);
    }

    shouldComponentUpdate(newProps){
        console.log(`[${this.state.name}] shouldComponentUpdate`);
        console.log(this.props);
        console.log(newProps);
        
        return true;
    }

  


    render(){
        console.log(`[${this.state.name}] render`);
        return (
            <div>
                [{this.props.ct}]
                <input type="button" onClick={this.props.add} value="add"/>
                <input type="button" onClick={this.props.subtract} value="subtract"/>
            </div>

        )
    }

}

export default ReactLifeCycleComponent;
