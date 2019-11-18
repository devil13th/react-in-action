import a from './importA'
import obj,{showObj} from './beImport'
import b,{obj2} from './importB';


a();
b();
alert(obj.name);
alert(obj.age);
showObj();
obj2.age = 100;
console.log("main",obj,obj2);