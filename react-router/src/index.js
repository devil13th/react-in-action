import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import { HashRouter,Redirect,BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import DefaultIndex from './DefaultIndex'
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';

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
                <hr/>
            
                <Route exact path='/' component={DefaultIndex} />
                <Route path='/about' component={About} />
                <Route path='/home' component={Home} />
                
            </div>  
            </HashRouter >
        </div>
      );
    }
}


ReactDOM.render((
    <App />
 
), document.getElementById('root'));
