[TOC]

# 项目说明文档

1. components：最基础的组件。这里面存放的只是最基本的UI组件，这些组件接收外部传过来的参数（数据），并将这些数据渲染的到界面。根据传入的参数的不同，界面渲染也不同。
2. container：contatiner负责将数据的组件进行连接，相当于将compontent组件和store里面的数据进行包装，生成一个新的有数据的组件。然后，在router.js配置文件中引用container中的组件。
3. routers：router目录其实和container目录基本一样，只是在利用dva开发的应用中叫router，在不是利用dva开发的应用中叫container而已，两者有一个即可。
4. models：model是dva中的一个重要概念，也可以看作是前端中的数据层。在我的理解里，dva将model以namespace作为唯一标识进行区分，然后将所有model的数据存储到redux中的store里面。在引用的时候，通过各个model的namespace进行引用。Model，是一个处理数据的地方，在model里面调用service层获取数据。
5. services：services负责向后台请求数据，在services里调用后台提供的api获取数据。
6. utils：工具类目录，比如常见的后台接口请求工具类。
7. styles：存放css或less样式文件。
8. constants.js：在里面定义一些通用的常量。
9. router.js：配置整个应用的路由。
10. index.js：整个应用的入口文件，dva和其它框架稍有不同。