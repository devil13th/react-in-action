import React,{Component} from 'react';
import {store} from '../redux/createStore.js'
import {TabHeader} from './TabHeader.js';
import {TabContent} from './TabContent.js';
import {Footer} from './Footer.js';
class App extends Component{
    constructor(props){
        super(props);
        // this.state = {tabs:this.props.tabs};
        this.state = {}
        this.state.tabs = store.getState().tabs;
        console.log(store.getState())
    }
    render(){
        return(
            <div>
                <TabHeader tabs={this.state.tabs}></TabHeader>
                <TabContent tabs={this.state.tabs}></TabContent>
                <Footer></Footer>
            </div>
        );
    }
}

export {App};