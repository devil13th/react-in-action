import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter, Switch} from 'react-router-dom';
import {App} from './App.js'
import {Repos} from './Repos.js';
import {About} from './About.js';
import {Repo} from './Repo.js';
console.log(App,Repos,About);



ReactDOM.render((
  <BrowserRouter >
    <div>
        <Route path="/" component={App}/>
        <Route path="/repos" component={Repos}/>
        <Route path="/repos/repo" component={Repo}/>
        <Route path="/about" component={About}/>
    </div>
  </BrowserRouter>
), document.getElementById('app'))

//比较下面三段注释掉的代码结合README.md文件比较容易理解

/*
ReactDOM.render((
  <BrowserRouter >
    <div>
        <Route exact path="/" component={App}/>
        <Route exact path="/repos" component={Repos}/>
        <Route path="/repos/repo" component={Repo}/>
        <Route path="/about" component={About}/>
    </div>
  </BrowserRouter>
), document.getElementById('app'))
*/


/*
ReactDOM.render((
  <BrowserRouter >
    <div>
        <Route path="/" component={App}/>
        <Route path="/repos" component={Repos}/>
        <Route path="/repos/repo" component={Repo}/>
        <Route path="/about" component={About}/>
    </div>
  </BrowserRouter>
), document.getElementById('app'))
 */

 /*
 ReactDOM.render((
  <BrowserRouter >
    <Switch>
        <Route path="/" component={App}/>
        <Route path="/repos" component={Repos}/>
        <Route path="/repos/repo" component={Repo}/>
        <Route path="/about" component={About}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('app'))
 */
