
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);


// -------------------------------------- babel ------------------------ //

const es6fun = () => {
  alert(1)
}

const es6obj = {a:1,b:2}
const es6obj2 = {...es6obj,c:3}

const es6arrOperater = [1,2,3,4,5,6];
const bbbb = [...es6arrOperater,7];

console.log(bbbb);



class Es6class {
  constructor(){
    alert("constructor");
  }

  toString(){
    return "1234"
  }
}



// -------------------------------------- polyfill ------------------------ //

const str = "   1   2   3  4  5   ";
alert("|" + str.trim() + "|")



let a = { 
  [Symbol()] : 4
};
console.log(a);


var ccc = Array.of(3, 11, 8)
console.log(ccc);

const p = new Promise(function(resolve,reject){

  let b = Math.floor(Math.random()*10+1);
  if(b % 2 ==0){
    resolve(b);
  }else{
    reject(b);
  }

}).then(function(x){
  console.log("resolve:" + x)
},function(x){
  console.log("reject:" + x)
})

