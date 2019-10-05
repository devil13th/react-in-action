import Mock from 'mockjs'
import $ from 'jquery'
import FetchMock from 'fetch-mock'
const Random = Mock.Random
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        // 属性 name 字符串随机重复1-10次
        'name|1-10':'123',
    }]
})
// 输出结果
//console.log(JSON.stringify(data, null, 4))

console.log('jquery::',$);

data = Mock.mock(
  {
    'list|10':[
      {
        name:`${Random.cfirst()}${Random.clast()} (${Random.last()}  ${Random.first()}) ${Random.cname()}` ,
        email:Random.email(),
        birthday:Random.date('yyyy-MM-dd HH:mm:ss SSS'),
        time:Random.time('yyyy-MM-dd HH:mm:ss SSS'),
        description:Random.paragraph(25,200),
        ipaddr:Random.ip(),
        blog:`${Random.protocol()}://${Random.domain()}/${Random.last()}`
      }
    ]
  }
)
console.log('data',data);



Mock.mock('http://127.0.0.1:7890/user', {

      "userInfo|4":[{    //生成|num个如下格式名字的数据

          "id|+1":1,  //数字从当前数开始后续依次加一

          "name":"@cname",    //名字为随机中文名字

          "ago|18-28":25,    //年龄为18-28之间的随机数字

          "sex|1":["男","女"],    //性别是数组中的一个，随机的

          "job|1":["web","UI","python","php"]    //工作是数组中的一个

      }]

})


$.ajax({
  url:'http://127.0.0.1:7890/user',
  dataType:'json',
  success:function(data){
     console.log("ajax:",data)
  }
})







FetchMock.mock('http://example.com', 
  Mock.mock({
    'list|10':[
      {
        name:`${Random.cfirst()}${Random.clast()} (${Random.last()}  ${Random.first()}) ${Random.cname()}` ,
        email:Random.email(),
        birthday:Random.date('yyyy-MM-dd HH:mm:ss SSS'),
        time:Random.time('yyyy-MM-dd HH:mm:ss SSS'),
        description:Random.paragraph(25,200),
        ipaddr:Random.ip(),
        blog:`${Random.protocol()}://${Random.domain()}/${Random.last()}`
      }
    ] 
  })
);



// 其他路由使用原生fetch，这段代码必须放最后
FetchMock.once('*', (url, options) => {
  FetchMock.restore();
  return fetch(url, options);
});



fetch('http://example.com',{
  method:"get",
  credentials: 'include', 
  headers: { 
    "Content-Type": "application/json"
  } 

}).then(function(r){
  return r.json();
}).then(function(r){
  console.log('fetch-mock',r);
})