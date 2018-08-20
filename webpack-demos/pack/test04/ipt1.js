

define(function (require, exports, module){
    const csl = require('./ipt2');

    const alt = {
        log : function(x){
            alert(x);
            csl.log(x)
        }
    }
 
    module.exports = alt;
});