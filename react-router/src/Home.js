import React,{ Component } from 'react';
import {Route,Link,NavLink,Switch} from 'react-router-dom'
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Home0 from './Home0';
import Home0Header from './Home0Header';



class Home extends Component {
    render() {
      return (
        <div>
            <h1>home page </h1> 

            <Route path='/home/home0' component={Home0Header} />

            <NavLink className="blue" to="/home">home</NavLink >  <br/>
            <NavLink className="blue" to="/home/home0">home0</NavLink >  <br/>
            <NavLink className="blue" to="/home/home1">home1</NavLink >  <br/>
            <NavLink className="blue" to="/home/home2">home2</NavLink >  <br/>
            <NavLink className="blue" to="/home/home3">home3</NavLink >   <br/> 

            <hr/>
            <Switch>
                <Route exact path='/home' component={Home0} />
                <Route path='/home/home0' component={Home0} />
                <Route path='/home/home1' component={Home1} />
                <Route path='/home/home2' component={Home2} />
                <Route path='/home/home3' component={Home3} />
            </Switch>
            <hr/>
        </div>
      ); 
    }
}

export default Home;