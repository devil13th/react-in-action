import obj from './beImport';
import {obj2} from './importA';
console.log("importB",obj,obj2);
function b(){
  obj.name = 'b';
  alert(obj.name);
}
obj.age = 2;
obj2.age =99;
console.log("importB",obj,obj2);
export {b as default,obj2}