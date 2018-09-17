import React,{ Component } from 'react';
import {Link,Route} from 'react-router-dom'
import {Home} from './Home.js';
import {About} from './About.js';
class DefaultIndex extends Component {
    render() {
      return (
        <div>
           <h1>default page </h1>   
           
        </div>
      ); 
    }
}

export default DefaultIndex;