import {show} from './beImport';
import main2 from './main2';
import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';
debugger;
console.log(moment);
console.log($);
$("#demo").html('<h1>Hello World</h1>');
show("我是被引入的JS - show()函数");
console.log(_.chunk(['a', 'b', 'c', 'd'], 3));
console.log("finish")
main2()
