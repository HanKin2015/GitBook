# node.js

下载官网：http://nodejs.cn/download/

## 安装express模块
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

## 无法解决require模块问题
https://blog.csdn.net/kdl_csdn/article/details/104307358


slice()函数
indexOf()函数
length函数


https://blog.csdn.net/nayi_224/article/details/98480814


## 最后一个字符
1、charAt()

str.charAt(str.length-1)
2、substr()

str.substr(str.length-1,1)
3、split()

var str = str.split("")
 
var targetStr = str[str.length-1]


isNaN()函数








