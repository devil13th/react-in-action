const serverCfg = {
    ip:"127.0.0.1",
    //ip:"192.168.16.152",
    port : "8080",
    contentPath : "/",

    getServerAddr : function(){
        let addr = `http://${this.ip}:${this.port}${this.contentPath}`;
        //alert(addr);
        return addr;
    }
}

export {serverCfg as serverCfg}