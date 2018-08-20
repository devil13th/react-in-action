# devServer 开发中Server 

devServer是webpack的一个http服务，在前端开发的时候有时候直接在本地打开有许多问题需要结局，例如ajax发送请求需要在服务器下，或者跨域访问不方便，devServer为我们解决了以上问题

## 基本配置

```
devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
},
```



[webpack-dev-server](https://github.com/webpack/webpack-dev-server) 命令启动后该配置生效，当服务器启动时，在解析模块列表之前会有一条消息： 

```
http://localhost:9000/
webpack output is served from /build/
Content not from webpack is served from /path/to/dist/
```

这将给出一些背景知识，就能知道服务器的访问位置，并且知道服务已启动。 



## 例子

```
  devServer: {
    public: '127.0.0.1:8001',
    port : "8001",
    open: true,// 自动打开浏览器
    //hot: true,// 开启热更新
    contentBase: __dirname+'/../public',//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
```



## 配置

### devServer.after

`function`

Provides the ability to execute custom middleware after all other middleware internally within the server.

```
after(app){
  // do fancy stuff
}
```

### devServer.allowedHosts

`array`

This option allows you to whitelist services that are allowed to access the dev server.

```
allowedHosts: [
  'host.com',
  'subdomain.host.com',
  'subdomain2.host.com',
  'host2.com'
]
```

Mimicking django's `ALLOWED_HOSTS`, a value beginning with `.` can be used as a subdomain wildcard. `.host.com` will match `host.com`, `www.host.com`, and any other subdomain of `host.com`.

```
// this achieves the same effect as the first example
// with the bonus of not having to update your config
// if new subdomains need to access the dev server
allowedHosts: [
    '.host.com',
    'host2.com'
]
```

To use this option with the CLI pass the `--allowed-hosts` option a comma-delimited string.

```
webpack-dev-server --entry /entry/file --output-path /output/path --allowed-hosts .host.com,host2.com
```

### devServer.before

`function`

Provides the ability to execute custom middleware prior to all other middleware internally within the server. This could be used to define custom handlers, for example:

```
before(app){
  app.get('/some/path', function(req, res) {
    res.json({ custom: 'response' });
  });
}
```

### devServer.bonjour

This option broadcasts the server via ZeroConf networking on start

```
bonjour: true
```

Usage via the CLI

```
webpack-dev-server --bonjour
```

### devServer.clientLogLevel

`string`

当使用*内联模式(inline mode)*时，在开发工具(DevTools)的控制台(console)将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时。这可能显得很繁琐。

你可以阻止所有这些消息显示，使用这个选项：

```
clientLogLevel: "none"
```

Usage via the CLI

```
webpack-dev-server --client-log-level none
```

可能的值有 `none`, `error`, `warning` 或者 `info`（默认值）。

### devServer.color - CLI only

`boolean`

Enables/Disables colors on the console.

```
webpack-dev-server --color
```

### devServer.compress

`boolean`

一切服务都启用[gzip 压缩](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/)：

```
compress: true
```

Usage via the CLI

```
webpack-dev-server --compress
```

### devServer.contentBase

`boolean` `string` `array`

告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。[`devServer.publicPath`](https://www.webpackjs.com/configuration/dev-server/#devserver-publicpath-) 将用于确定应该从哪里提供 bundle，并且此选项优先。

默认情况下，将使用当前工作目录作为提供内容的目录，但是你可以修改为其他目录：

```
contentBase: path.join(__dirname, "public")
```

注意，推荐使用绝对路径。

但是也可以从多个目录提供内容：

```
contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]
```

禁用 `contentBase`：

```
contentBase: false
```

Usage via the CLI

```
webpack-dev-server --content-base /path/to/content/dir
```

### devServer.disableHostCheck

`boolean`

When set to true this option bypasses host checking. THIS IS NOT RECOMMENDED as apps that do not check the host are vulnerable to DNS rebinding attacks.

```
disableHostCheck: true
```

Usage via the CLI

```
webpack-dev-server --disable-host-check
```

### devServer.filename

`string`

在**惰性模式**中，此选项可减少编译。 默认在**惰性模式**，每个请求结果都会产生全新的编译。使用 `filename`，可以只在某个文件被请求时编译。

如果 `output.filename` 设置为 `bundle.js` ，`filename` 使用如下：

```
lazy: true,
filename: "bundle.js"
```

现在只有在请求 `/bundle.js` 时候，才会编译 bundle。

> `filename` 在不使用**惰性加载**时没有效果。

### devServer.headers

`object`

在所有响应中添加首部内容：

```
headers: {
  "X-Custom-Foo": "bar"
}
```

### devServer.historyApiFallback

`boolean` `object`

当使用 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 时，任意的 `404` 响应都可能需要被替代为 `index.html`。通过传入以下启用：

```
historyApiFallback: true
```

通过传入一个对象，比如使用 `rewrites` 这个选项，此行为可进一步地控制：

```
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
```

当路径中使用点(dot)（常见于 Angular），你可能需要使用 `disableDotRule`：

```
historyApiFallback: {
  disableDotRule: true
}
```

Usage via the CLI

```
webpack-dev-server --history-api-fallback
```

更多选项和信息，查看 [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) 文档。

### devServer.host

`string`

指定使用一个 host。默认是 `localhost`。如果你希望服务器外部可访问，指定如下：

```
host: "0.0.0.0"
```

Usage via the CLI

```
webpack-dev-server --host 0.0.0.0
```

### devServer.hot

`boolean`

启用 webpack 的模块热替换特性：

```
hot: true
```

> Note that `webpack.HotModuleReplacementPlugin` is required to fully enable HMR. If `webpack` or `webpack-dev-server` are launched with the `--hot` option, this plugin will be added automatically, so you may not need to add this to your `webpack.config.js`. See the [HMR concepts page](https://www.webpackjs.com/concepts/hot-module-replacement) for more information.

### devServer.hotOnly

`boolean`

Enables Hot Module Replacement (see [`devServer.hot`](https://www.webpackjs.com/configuration/dev-server/#devserver-hot)) without page refresh as fallback in case of build failures.

```
hotOnly: true
```

Usage via the CLI

```
webpack-dev-server --hot-only
```

### devServer.https

`boolean` `object`

默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务：

```
https: true
```

以上设置使用了自签名证书，但是你可以提供自己的：

```
https: {
  key: fs.readFileSync("/path/to/server.key"),
  cert: fs.readFileSync("/path/to/server.crt"),
  ca: fs.readFileSync("/path/to/ca.pem"),
}
```

此对象直接传递到 Node.js HTTPS 模块，所以更多信息请查看 [HTTPS 文档](https://nodejs.org/api/https.html)。

Usage via the CLI

```
webpack-dev-server --https
```

To pass your own certificate via the CLI use the following options

```
webpack-dev-server --https --key /path/to/server.key --cert /path/to/server.crt --cacert /path/to/ca.pem
```

### devServer.index

`string`

The filename that is considered the index file.

```
index: 'index.htm'
```

### devServer.info - CLI only

`boolean`

Output cli information. It is enabled by default.

```
webpack-dev-server --info=false
```

### devServer.inline

`boolean`

在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用*内联模式(inline mode)*。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。

也可以使用 **iframe 模式**，它在通知栏下面使用 `<iframe>` 标签，包含了关于构建的消息。切换到 **iframe 模式**：

```
inline: false
```

Usage via the CLI

```
webpack-dev-server --inline=false
```

> 推荐使用模块热替换的内联模式，因为它包含来自 websocket 的 HMR 触发器。轮询模式可以作为替代方案，但需要一个额外的入口点：`'webpack/hot/poll?1000'`。

### devServer.lazy

`boolean`

当启用 `lazy` 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“**惰性模式**”。

```
lazy: true
```

Usage via the CLI

```
webpack-dev-server --lazy
```

> `watchOptions` 在使用**惰性模式**时无效。

> 如果使用命令行工具(CLI)，请确保**内联模式(inline mode)**被禁用。

### devServer.noInfo

`boolean`

启用 `noInfo` 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。

```
noInfo: true
```

### devServer.open

`boolean`

When `open` is enabled, the dev server will open the browser.

```
open: true
```

Usage via the CLI

```
webpack-dev-server --open
```

If no browser is provided (as shown above), your default browser will be used. To specify a different browser, just pass its name:

```
webpack-dev-server --open 'Google Chrome'
```

### devServer.openPage

`string`

Specify a page to navigate to when opening the browser.

```
openPage: '/different/page'
```

Usage via the CLI

```
webpack-dev-server --open-page "/different/page"
```

### devServer.overlay

`boolean` `object`

Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors:

```
overlay: true
```

If you want to show warnings as well as errors:

```
overlay: {
  warnings: true,
  errors: true
}
```

### devServer.pfx

`string`

When used via the CLI, a path to an SSL .pfx file. If used in options, it should be the bytestream of the .pfx file.

```
pfx: '/path/to/file.pfx'
```

Usage via the CLI

```
webpack-dev-server --pfx /path/to/file.pfx
```

### devServer.pfxPassphrase

`string`

The passphrase to a SSL PFX file.

```
pfxPassphrase: 'passphrase'
```

Usage via the CLI

```
webpack-dev-server --pfx-passphrase passphrase
```

### devServer.port

`number`

指定要监听请求的端口号：

```
port: 8080
```

Usage via the CLI

```
webpack-dev-server --port 8080
```

### devServer.proxy

`object`

如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

dev-server 使用了非常强大的 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 包。更多高级用法，请查阅其[文档](https://github.com/chimurai/http-proxy-middleware#options)。

在 `localhost:3000` 上有后端服务的话，你可以这样启用代理：

```
proxy: {
  "/api": "http://localhost:3000"
}
```

请求到 `/api/users` 现在会被代理到请求 `http://localhost:3000/api/users`。

如果你不想始终传递 `/api` ，则需要重写路径：

```
proxy: {
  "/api": {
    target: "http://localhost:3000",
    pathRewrite: {"^/api" : ""}
  }
}
```

默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下：

```
proxy: {
  "/api": {
    target: "https://other-server.example.com",
    secure: false
  }
}
```

有时你不想代理所有的请求。可以基于一个函数的返回值绕过代理。

在函数中你可以访问请求体、响应体和代理选项。必须返回 `false` 或路径，来跳过代理请求。

例如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理。你可以这样做：

```
proxy: {
  "/api": {
    target: "http://localhost:3000",
    bypass: function(req, res, proxyOptions) {
      if (req.headers.accept.indexOf("html") !== -1) {
        console.log("Skipping proxy for browser request.");
        return "/index.html";
      }
    }
  }
}
```

If you want to proxy multiple, specific paths to the same target, you can use an array of one or more objects with a `context` property:

```
proxy: [{
  context: ["/auth", "/api"],
  target: "http://localhost:3000",
}]
```

### devServer.progress - 只用于命令行工具(CLI)

`boolean`

将运行进度输出到控制台。

```
webpack-dev-server --progress
```

### devServer.public

`string`

当使用*内联模式(inline mode)*并代理 dev-server 时，内联的客户端脚本并不总是知道要连接到什么地方。它会尝试根据 `window.location` 来猜测服务器的 URL，但是如果失败，你需要这样。

例如，dev-server 被代理到 nginx，并且在 `myapp.test` 上可用：

```
public: "myapp.test:80"
```

Usage via the CLI

```
webpack-dev-server --public myapp.test:80
```

### devServer.publicPath

`string`

此路径下的打包文件可在浏览器中访问。

假设服务器运行在 `http://localhost:8080` 并且 `output.filename` 被设置为 `bundle.js`。默认 `publicPath`是 `"/"`，所以你的包(bundle)可以通过 `http://localhost:8080/bundle.js` 访问。

可以修改 `publicPath`，将 bundle 放在一个目录：

```
publicPath: "/assets/"
```

你的包现在可以通过 `http://localhost:8080/assets/bundle.js` 访问。

> 确保 `publicPath` 总是以斜杠(/)开头和结尾。

也可以使用一个完整的 URL。这是模块热替换所必需的。

```
publicPath: "http://localhost:8080/assets/"
```

bundle 可以通过 `http://localhost:8080/assets/bundle.js` 访问。

> `devServer.publicPath` 和 `output.publicPath` 一样被推荐。

### devServer.quiet

`boolean`

启用 `quiet` 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。

```
quiet: true
```

Usage via the CLI

```
webpack-dev-server --quiet
```

### devServer.setup

`function`

> This option is **deprecated** in favor of `before` and will be removed in v3.0.0.

Here you can access the Express app object and add your own custom middleware to it. For example, to define custom handlers for some paths:

```
setup(app){
  app.get('/some/path', function(req, res) {
    res.json({ custom: 'response' });
  });
}
```

### devServer.socket

`string`

The Unix socket to listen to (instead of a host).

```
socket: 'socket'
```

Usage via the CLI

```
webpack-dev-server --socket socket
```

### devServer.staticOptions

It is possible to configure advanced options for serving static files from `contentBase`. See the [Express documentation](http://expressjs.com/en/4x/api.html#express.static) for the possible options. An example:

```
staticOptions: {
  redirect: false
}
```

> This only works when using `contentBase` as a `string`.

### devServer.stats

`string` `object`

This option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you want some bundle information, but not all of it.

To show only errors in your bundle:

```
stats: "errors-only"
```

For more information, see the [**stats documentation**](https://www.webpackjs.com/configuration/stats).

> This option has no effect when used with `quiet` or `noInfo`.

### devServer.stdin - CLI only

`boolean`

This option closes the server when stdin ends.

```
webpack-dev-server --stdin
```

### devServer.useLocalIp

`boolean`

This option lets the browser open with your local IP.

```
useLocalIp: true
```

Usage via the CLI

```
webpack-dev-server --useLocalIp
```

### devServer.watchContentBase

`boolean`

Tell the server to watch the files served by the `devServer.contentBase` option. File changes will trigger a full page reload.

```
watchContentBase: true
```

It is disabled by default.

Usage via the CLI

```
webpack-dev-server --watch-content-base
```

### devServer.watchOptions

`object`

与监视文件相关的控制选项。

webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。[Vagrant](https://www.vagrantup.com/) 也有很多问题。在这些情况下，请使用轮询：

```
watchOptions: {
  poll: true
}
```

如果这对文件系统来说太重了的话，你可以修改间隔时间（以毫秒为单位），将其设置为一个整数。