import React,{ Component } from 'react';
import {Route,Link,NavLink,Switch} from 'react-router-dom'
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Home0 from './Home0';
import Home0Header from './Home0Header';
import a from '../nav.css';


class Home extends Component {
    render() {

        console.log(a);
      return (
        <div>
            <h1>home page </h1> 
            <pre>
                1.路由嵌套，URL为"/home/home0"的时候可看到Home0Header,Route标签只要URL和其path只要一致
                2.NavLink标签 是用于匹配URL如果一直则有样式".active" 而Link标签没有
            </pre>
            <Route path='/home/home0' component={Home0Header} />

            <NavLink className={a.blue} to="/home">home</NavLink >  <br/>
            <NavLink className={a.blue} to="/home/home0">home0</NavLink >  <br/>
            <NavLink className={a.blue} to="/home/home1">home1</NavLink >  <br/>
            <NavLink className={a.blue} to="/home/home2">home2</NavLink >  <br/>
            <NavLink className={a.blue} to="/home/home3">home3</NavLink >   <br/> 

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