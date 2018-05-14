import React,{Component} from 'react';
import {store} from '../redux/createStore.js'

class TabHeader extends Component{
    constructor(props){
        super(props);
    }

    onClick(){
        this.setState();
     }
 
     componentDidMount(){
         store.subscribe(this.onClick);
     }
 
     componentWillUnmount(){
         store.unsubscribe(this.onClick);
     }

    render(){
        const doms = [];
        this.props.tabs.map((item,index) => {
            let id = "tabHeader"+index;
            doms.push(<div id={id} key={index}>{item.content}</div>);
        })
        return (
            <div>
                {doms}
            </div>
        )
    }
}

export {TabHeader};