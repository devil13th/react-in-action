import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import About1 from './About1';
import About2 from './About2';
class About extends Component {
  render() {
    return (
      <div>
        <h1>about page </h1>
        
        <Link to="/about">about</Link>  <br />
        <Link to="/about/about1">about1</Link>  <br />
        <Link to="/about/about2">about2</Link>  <br />
        <hr />
        <Route exact path='/about' component={About1} />
        <Route path='/about/about1' component={About1} />
        <Route path='/about/about2' component={About2} />
               
      </div>
    );
  }
}

export default About;