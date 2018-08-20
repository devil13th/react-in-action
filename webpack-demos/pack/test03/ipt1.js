define('alt',['./ipt2'],function (csl){
　　return {
        log : function(x){
            alert(x);
            csl.log(x);
        }
    }
});
