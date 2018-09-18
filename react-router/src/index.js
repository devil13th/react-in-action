import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import { HashRouter,Redirect,BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import NotFound from './NotFound'
import Home from './Home.js';
import About from './About.js';
import DefaultIndex from './DefaultIndex'
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Param from './Param';

console.log(React);
console.log(ReactDOM);



class App extends Component {
    render() {
      return (
        <div>
          

            <HashRouter>
            <div>
                <Link to="/">首页</Link><br/>
                <Link to="/about">about</Link><br/>
                <Link to="/home">home >></Link><br/>
                <Link to="/param/devil13th">Param</Link><br/>
                
                <Link to="/xx">not found</Link><br/>
                <hr/>
                <Switch>
                    <Route exact path='/' component={DefaultIndex} />
                    <Route path='/about' component={About} />
                    <Route path='/home' component={Home} />
                    <Route path="/param/:userId" component={Param} />

                    <Route path='/NotFound' component={NotFound} />
                    <Redirect to='/NotFound'/>
                </Switch>
            </div>  
            </HashRouter >
        </div>
      );
    }
}


ReactDOM.render((
    <App />
 
), document.getElementById('root'));
