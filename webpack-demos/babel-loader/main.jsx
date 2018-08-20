const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);

const es6fun = () => {
  alert(1)
}

const es6obj = {a:1,b:2}
const es6obj2 = {...es6obj,c:3}

const es6arrOperater = [1,2,3,4,5,6];
const bbbb = [...es6arrOperater,7];


class Es6class {
  constructor(){
    alert("constructor");
  }

  toString(){
    return "1234"
  }
}
