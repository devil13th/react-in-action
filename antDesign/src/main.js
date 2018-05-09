import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter, Switch} from 'react-router-dom';
import { App } from './App.js';
import { Layout1 } from './layout/Layout1.js';
import { Layout2 } from './layout/Layout2.js';
import { Layout3 } from './layout/Layout3.js';
import { Layout4 } from './layout/Layout4.js';
import { Modal1 } from './modal/Modal1.js';

ReactDOM.render((
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={App}/>
          <Route path="/Layout1" component={Layout1}/>
          <Route path="/Layout2" component={Layout2}/>
          <Route path="/Layout3" component={Layout3}/>
          <Route path="/Layout4" component={Layout4}/>

          <Route path="/Modal1" component={Modal1}/>

          
      </Switch>
    </BrowserRouter>
  ), document.getElementById('app'))
  