import request from 'superagent';
console.log(request);
request
  .get('/data.json') //get方式请求 /data.text
  .set('Content-Type', 'application/json') //设置Content-Type

  .set('Accept', 'application/json') //接受的类型
  
  .query({class:"class-1"}) //发送的参数
  //.query({ action: 'edit', city: 'London' }) // query string
  //.use(prefix) // Prefixes *only* this request
  //.use(nocache) // Prevents caching of *only* this request
  .end((err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
        console.log(res.body)
        console.log(res.body.root.users)
    }
    
});



/**
 * 以下为跨域请求例子
 * 被请求的真实地址是127.0.0.1:8000/devil13th/backlog/backlog!backlogInfoForm.do
 * 
 * 本利中发送请求的地址是
 * /proxy/backlog/backlog!backlogInfoForm.do
 * 以"/proxy"开头请求的是要进行跨域请求 (/proxy目录在src/webpack.confgi.dev.js中配置,内容如下)
 * 
 * 
  devServer: {
    // ----------- ajax proxy ---------
    proxy: {
      '/proxy': {
          target: 'http://127.0.0.1:8000/devil13th',
          changeOrigin: true,
          pathRewrite: {
              '^/proxy': ''
          }
      }
    },

    假设你主机名为 localhost:8080 , ajax请求 API 的 url 是 http：//your_api_server.com/user/list
    '/proxy'：如果点击某个按钮，触发请求 API 事件，这时请求 url 是http：//localhost:8080/proxy/user/list 。
    changeOrigin：如果 true ，那么 http：//localhost:8080/proxy/user/list 变为 http：//your_api_server.com/proxy/user/list 。但还不是我们要的 url 。
    pathRewrite：重写路径。匹配 /proxy ，然后变为'' ，那么 url 最终为 http：//your_api_server.com/user/list 。


 * "/backlog/backlog!backlogInfoForm.do"是请求的其他网站的真实路径
 * 
 * 
 * 
 */
request
  .get('/proxy/backlog/backlog!backlogInfoForm.do') //get方式请求 /data.text
  .set('Content-Type', 'application/json') //设置Content-Type
  .set('Accept', 'application/json') //接受的类型
 
  
  .end((err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
        document.write(res.text)
    }
    
});

