import {show} from './beImport';
import $ from 'jquery';
import _ from 'lodash';
debugger;
console.log($);
$("#demo").html('<h1>Hello World</h1>');
show("我是被引入的JS - show()函数");
console.log(_.chunk(['a', 'b', 'c', 'd'], 3));
console.log("finish")
