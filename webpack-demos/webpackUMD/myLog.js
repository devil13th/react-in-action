var myLog = {
    debug : function(msg){
        console.log("debug : " + msg);
    },
    info : function(msg){
        console.log("info : " + msg);
    },
    error : function(msg){
        console.log("error : " + msg);
    }

}
export{myLog as myLog}