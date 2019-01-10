
import {myLog as log } from './myLog';
var myMath = {
    add : function(a,b){
        log.info("计算:" + a + " + " + b);
        return a+b;
    }
}

export {myMath as myMath}

