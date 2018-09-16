import React,{ Component } from 'react';
import {Route,Link} from 'react-router-dom'
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Home0 from './Home0';

class Home extends Component {
    render() {
      return (
        <div>
            <h1>home page </h1> 
           
            <Link to="/home">home</Link>  <br/>
            <Link to="/home/home0">home0</Link>  <br/>
            <Link to="/home/home1">home1</Link>  <br/>
            <Link to="/home/home2">home2</Link>  <br/>
            <Link to="/home/home3">home3</Link>   <br/> 

            <hr/>
                <Route exact path='/home' component={Home0} />
                <Route path='/home/home0' component={Home0} />
                <Route path='/home/home1' component={Home1} />
                <Route path='/home/home2' component={Home2} />
                <Route path='/home/home3' component={Home3} />

            <hr/>
        </div>
      ); 
    }
}

export default Home;