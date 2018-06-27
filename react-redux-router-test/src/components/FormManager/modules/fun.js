import request from 'superagent';
import {  message} from 'antd';
function createQueryFormListFn(dispatch,currentPage=1,pageSize=10,condition){
    return () => {
       
        dispatch({
            type : "LOADING_FORMLIST",
            loading:true,
        });
    
        //ajax 获取表单管理列表数据
        request
        //.get(`/proxy/form/${currentPage}/${pageSize}?tp=${condition}`) //get方式请求 请求 //http://127.0.0.1:8888/sbt/form/

        .get(`/proxy/api/form/querySystemVM?currentPage=${currentPage}&pageSize=${pageSize}&tp=${condition}`)

        //.set('Content-Type', 'application/json') //设置Content-Type
        //.set('Accept', 'application/json') //接受的类型
        //.query({type:condition}) //发送的参数
        //.query({ action: 'edit', city: 'London' }) // query string
        //.use(prefix) // Prefixes *only* this request
        //.use(nocache) // Prevents caching of *only* this request
        .end((err, res) => {
            if (err) {
                //console.log(err);
                message.error('网络错误');
                 //停止loading
                 dispatch({
                    type : "LOADING_FORMLIST",
                    loading:false,
                });
            } else {
                console.log("-------------------");
                console.log(res)
                var data = JSON.parse(res.text);
                //设置表单管理数据
                dispatch({
                    type:"SET_FORM_DATA",
                    data:data.result
                });
                
                //停止loading
                dispatch({
                    type : "LOADING_FORMLIST",
                    loading:false,
                });
            }
        });
    }

     
}




export {createQueryFormListFn as createQueryFormListFn}