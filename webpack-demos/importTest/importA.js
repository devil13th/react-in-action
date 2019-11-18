import obj from './beImport';
import obj2 from './beImportO';
console.log('importA',obj,obj2);
function a(){
  obj.name = 'a';
  alert(obj.name);
}
obj.age = 1;
obj2.age =98;
console.log('importA',obj,obj2);

export { a as default , obj2}