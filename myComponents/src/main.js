import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter, Switch} from 'react-router-dom';

import {ThdTab} from './components/tab/ThdTab.js';
import {ThdTabContainer} from './components/tab/ThdTabContainer.js';

import {ThdTabSingle} from './components/tab/ThdTabSingle.js';

import {ThdTabContainerSingle} from './components/tab/ThdTabContainerSingle.js';



class App extends Component {
    render(){
        return (
           <div>
            <ThdTab>
                <ThdTabContainer tit="tit1" index={1}>content1</ThdTabContainer>
                <ThdTabContainer tit="tit2" index={2}>content2</ThdTabContainer>
            </ThdTab>
            <hr/>

            <ThdTabSingle></ThdTabSingle>
            </div>
           
        );
    }
}



ReactDOM.render(
    <App></App>, 
    document.getElementById('app')
);
