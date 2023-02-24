# node.js

下载官网：http://nodejs.cn/download/

## 1、安装express模块
```
npm install express -g
npm ls -g	查看全局安装的模块
npm root -g 查看模块安装目录

require("express");
```

明明安装成功了，然鹅一旦导入就报错。
```
D:\Github\Storage\html\testnodejs>npm install express -g
+ express@4.17.1
updated 1 package in 14.991s

D:\Github\Storage\html\testnodejs>node
Welcome to Node.js v12.16.2.
Type ".help" for more information.
> require('express')
Uncaught Error: Cannot find module 'express'
Require stack:
```

解决办法：
通过node变量获取查找目录发现居然没有安装的目录。
```
D:\Github\Storage\html\testnodejs>node
Welcome to Node.js v12.16.2.
Type ".help" for more information.
> express.paths
Uncaught ReferenceError: express is not defined
> global.module.paths
[
  'D:\\Github\\Storage\\html\\testnodejs\\repl\\node_modules',
  'D:\\Github\\Storage\\html\\testnodejs\\node_modules',
  'D:\\Github\\Storage\\html\\node_modules',
  'D:\\Github\\Storage\\node_modules',
  'D:\\Github\\node_modules',
  'D:\\node_modules',
  'C:\\Users\\Administrator\\.node_modules',
  'C:\\Users\\Administrator\\.node_libraries',
  'C:\\Program Files\\nvm\\lib\\node'
]
>
```
发现查找路径里不包含全局路径，所以要把全局路径加入到查找目录里。可以把本地的node_modules和全局的node_modules目录，都放在系统变量NODE_PATH里即可。

发现没有这个系统变量，手动添加即可。
C:\Program Files\nvm\node_modules

重启dos窗口发现变化真大。应该是检测当前目录下以及一些全局变量中，以及NODE_PATH目录下。
```
Microsoft Windows [版本 6.1.7601]
版权所有 (c) 2009 Microsoft Corporation。保留所有权利。

C:\Users\Administrator>node
Welcome to Node.js v12.16.2.
Type ".help" for more information.
> global.module.paths
[
  'C:\\Users\\Administrator\\repl\\node_modules',
  'C:\\Users\\Administrator\\node_modules',
  'C:\\Users\\node_modules',
  'C:\\node_modules',
  'C:\\Program Files\\nvm\\node_modules',
  'C:\\Users\\Administrator\\.node_modules',
  'C:\\Users\\Administrator\\.node_libraries',
  'C:\\Program Files\\nvm\\lib\\node'
]
>
```
导入express模块搞定。

## 2、无法解决require模块问题
https://blog.csdn.net/kdl_csdn/article/details/104307358

slice()函数
indexOf()函数
length函数

https://blog.csdn.net/nayi_224/article/details/98480814

## 3、最后一个字符
1、charAt()

str.charAt(str.length-1)
2、substr()

str.substr(str.length-1,1)
3、split()

var str = str.split("")
 
var targetStr = str[str.length-1]

isNaN()函数

## 4、这个错误居然是文件名错误......
```
D:\Github\Storage\html\httprequest>node https-url.js
internal/modules/cjs/loader.js:983
  throw err;
  ^

Error: Cannot find module 'D:\Github\Storage\html\httprequest\https-url.js'
[90m    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:980:15)[
[90m    at Function.Module._load (internal/modules/cjs/loader.js:862:27)[39m
[90m    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:
[90m    at internal/main/run_main_module.js:18:47[39m {
  code: [32m'MODULE_NOT_FOUND'[39m,
  requireStack: []
}
```

```
正常现象
D:\Github\Storage\html\httprequest>node http-timeout1.js
STATUS: 200
HEADERS: {"server":"nginx","date":"Mon, 25 Jan 2021 08:27:16 GMT","content-type":"text
ncoding":"chunked","connection":"close","vary":"Accept-Encoding, Accept-Encoding","set
d, 24-Feb-2021 08:27:16 GMT; Max-Age=2592000; Path=/","sid=1611563236785310; expires=W
Age=2592000; Path=/"]}
LOCATION: undefined
BODY: sucess! client ip: 118.250.110.197
response end...
response close...

协议错误，一般来说可能是端口错误，可能使用了http请求了443端口
D:\Github\Storage\html\httprequest>node http-timeout1.js
error got :write EPROTO 6920:error:1408F10B:SSL routines:ssl3_get_record:wrong version
\ssl\record\ssl3_record.c:332:

timeout got :have been timeout...

80端口未开通，正确端口是8000
D:\Github\Storage\html\httprequest>node http-timeout1.js
error got :connect ECONNREFUSED 127.0.0.1:80
timeout got :have been timeout...

协议错误，一般来说可能是端口错误，可能使用了https请求了80端口
D:\Github\Storage\html\httprequest>node http-timeout1.js
error got :write EPROTO 14200:error:1408F10B:SSL routines:ssl3_get_record:wrong versio
l\ssl\record\ssl3_record.c:332:

timeout got :have been timeout...

正常现象
D:\Github\Storage\html\httprequest>node http-timeout1.js
STATUS: 200
HEADERS: {"content-type":"text/plain","date":"Mon, 25 Jan 2021 08:29:05 GMT","connecti
hunked"}
LOCATION: undefined
BODY: Hello World

response end...
response close...
```

http默认端口是80
https默认端口是443

http状态码查询：https://www.runoob.com/http/http-status-codes.html

http://dev.kdlapi.com/testproxy
可以通过80端口访问

https://dev.kdlapi.com/testproxy
可以通过443端口访问

## 5、Nodejs HTTP请求的超时处理 Nodejs HTTP Client Request Timeout Handle
https://blog.csdn.net/shulianghe/article/details/40108271
https://www.cnblogs.com/flyingzl/articles/2286738.html

代码中有一些错误需要修正。

## 6、注意点
split()函数：以某个字符串分割
slice()函数：按位置切割子字符串
startsWith()函数：判断是否是以某个字符串作为头部开始

恒等：===
不恒等：!==

修改传参函数值不会有异步问题，全局变量会有异步问题。

## 7、node.js和nodejs的区别
两者没有区别

## 8、npm
npm（全称 Node Package Manager，即“node包管理器”）是Nodejs默认的、以JavaScript编写的软件包管理系统。通过npm可以安装、共享、分发代码，管理项目依赖关系。
npm是JavaScript世界的包管理工具，并且是Node.js平台的默认包管理工具，会随着Nodejs一起安装。类似Java语法中的maven，gradle，python中的pip。

npm能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

npm是和Nodejs一起并存的，只要安装了Nodejs，npm也安装好了，安装好Nodejs之后。打开终端，执行如下命令，检查是否安装成功。

## 9、nodejs安装
linux：
```
apt-get update
apt-get install nodejs
但是通过node -v查看版本会很低

建议去官网下载：https://nodejs.org/en/download/
```
windows同理。

## 10、查看版本确认安装成功
node版本号：node -v
npm版本号： npm -v

## 11、nvm




https://github.com/nwjs/nw.js/tree/nw24
https://blog.csdn.net/kaimo313/article/details/126405942
https://github.com/nwjs/nw.js/wiki/Full-Console-Logging


