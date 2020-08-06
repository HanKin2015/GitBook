[TOC]
# 搭建gitbook

# 1、多款工具比较
- gitbook
- git issue
- 豆瓣日记
- gist
- github page

上面就是一些写博客的工具和地方，还有hexo+GitHub page或者coding，我又发现了一个开源中国的码云。个人觉得不是一个前端爱好者就不要太折腾了，工具千千万，各有所爱。主要是现在没有太多的时间。

## Introduction
实际上，GitBook 是一个基于 Node.js 的命令行工具，支持 Markdown 和 AsciiDoc 两种语法格式，可以输出 HTML、PDF、eBook 等格式的电子书。所以我更喜欢把 GitBook 定义为文档格式转换工具。

执行 gitbook build 命令构建书籍，默认将生成的静态网站输出到 _book 目录。实际上，这一步也包含在 gitbook serve 里面，因为它们是 HTML，所以 GitBook 通过 Node.js 给你提供服务了。

要公开的项目放在github,把私有的放在gitee。coding,用是因为之前贪图提供的免费动态 Pages ，但是这个服务要在2018年7月截至了，并被腾讯收购了。


可以考虑国外免费的服务器。
[Heroku 教程：使用 Heroku 快速搭建站点](https://segmentfault.com/a/1190000014699439?utm_source=tag-newest)
## Heroku 
Heroku是一个支持多种编程语言的云平台。
在2010年被Salesforce.com收购。Heroku作为最开始的云平台之一，从2007年6月起开发，当时它仅支持Ruby，但后来增加了对Java、Node.js、Scala、Clojure、Python以及（未记录在正式文件上）PHP和Perl的支持。基础操作系统是Debian，在最新的堆栈则是基于Debian的Ubuntu。

# 2、安装nodejs
## 2-1、nvm（Node Version Manager）
[nvm官网](https://github.com/nvm-sh/nvm)

在我们的日常开发中经常会遇到这种情况：手上有好几个项目，每个项目的需求不同，进而不同项目必须依赖不同版的 NodeJS 运行环境。如果没有一个合适的工具，这个问题将非常棘手。

nvm 应运而生，nvm 是 Mac 下的 node 管理工具，有点类似管理 Ruby 的 rvm，如果需要管理 Windows 下的 node，官方推荐使用 nvmw 或 nvm-windows。

其实最开始使用的是 n 命令，命令简洁到极致了，无奈总是安装不成功，往往下载一部分就报 curl 错误。 
然后又找到这个 nvm，配合淘宝源，简单快捷～

[nvm介绍及使用](https://www.jianshu.com/p/d0e0935b150a)

[使用 nvm 管理不同版本的 node 与 npm](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)

### 下载安装
感受：强烈推荐安装nvm，虽然自己用可能只会用到一个版本。

[nvm-windows官网下载](https://github.com/coreybutler/nvm-windows/releases)

官网下载真的慢，推荐走百度网盘，下载nvm-setup.zip。
[Windows下安装及使用NVM](https://blog.csdn.net/qq_32682137/article/details/82684898)

### 重点：修改settings.txt（主要是将npm镜像改为淘宝的镜像，可以提高下载速度。）
在你安装的目录下找到settings.txt文件，打开后加上 
node_mirror: https://npm.taobao.org/mirrors/node/ 
npm_mirror: https://npm.taobao.org/mirrors/npm/

### 使用
nvm list查看目前已经安装的版本
nvm list available 显示可下载版本的部分列表
nvm install 版本号 安装指定的版本的nodejs
nvm use 版本号 使用指定版本的nodejs
nvm root　查看nvm安装路径
nvm install latest 下载最新的node版本和与之对应的npm版本
nvm uninstall 6.2.0 #卸载对应的版本
nvm ls
node -v
npm -v


点击install.cmd,回车回车
```
root: C:\Users\hj159\AppData\Roaming\nvm 
path: C:\Program Files\nodejs 
arch: 64 
proxy: none

node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

缺点：没有自更新，即使用命令。似乎需要下载覆盖安装。

## 2-2、nodejs
[nodejs官网](https://nodejs.org/en/)

[nodejs中文官网](http://nodejs.cn/download/)

中文网站下载速度快的不是一星半点儿。

[Node.js中LTS和Current的有啥区别？](https://www.jianshu.com/p/014a14713dce)

[软件的Alpha、Beta、GM、OEM、LTS等版本的含义](https://blog.csdn.net/qq_36761831/article/details/83188138)


### 使用
两次ctrl+c退出或.exit。


### 问题1：没有npm命令，并且没有node_modules文件
总会遇到那么坑的坑。。。。。
难道是我的路径原因？？Program Files文件夹有空格？？
并且通过安装中提示有个temp文件夹，但是也没有，里面含有npm安装包。

### 问题2：卸载nodejs失败
Uninstalling node v10.16.3...Error removing node v10.16.3
Manually remove C:\Users\hj159\AppData\Roaming\nvm\v10.16.3.

坑啊：为啥老是会犯这种低级幼稚的错误，没有给cmd管理员权限。我固态只有两个磁盘分区，所以安装在了c盘，需要管理员权限才能进行读写操作。。。。

但是安装的时候npm还是安装失败了，但是下载相应的安装包在temp里面。好像启动了360还是不会下载npm安装包？？卸载了，但是下载后安装好像还是失败了，并且删除了temp文件夹，算了还是手动安装吧。


## 2-3、手动下载单独安装npm
好坑啊，居然折腾了半天。
- 淘宝网https://npm.taobao.org/mirrors/npm/下载安装包zip格式
- 解压缩，会有个cli-6.9.0文件夹，改名为npm并移动到node_modules文件夹里面
- 将cli-6.9.0文件夹中bin文件夹里面的npm和npm.cmd文件拷贝到node.exe文件夹里面
- 添加环境变量使npm有效，即v10.16.3文件夹
- npm -v成功

PS：反正安装npm失败，暂时不考虑设置全局npm。

因为nvm可以管理多个版本的node，如果每次添加一个node版本都要安装一堆的包很麻烦,如果有一个npm可以让各个版本的node共用，就不会这么麻烦了，这就是为什么我们要配置一个全局的npm的原因。简单的三步就可以配置一个全局的npm。

1.  npm config set prefix "E:\dev\nvm\npm"//配置用npm下载包时全局安装的包路径
2.  npm install npm -g --registry=https://registry.npm.taobao.org //安装全局npm,不同的node都使用这个npm，想更新全局的npm的话首先删除全局路径(就是上一行命令的地址,可以使用npm config ls查看)下的npm,再执行一次这个命令即可
3.  在用户变量中添加 NPM_HOME=E:\dev\nvm\npm，path中添加%NPM-HOME%
6.一些替代npm的方式
npm install -g cnpm --registry=https://registry.npm.taobao.org //使用淘宝镜像cnmp替代npm
npm install -g yarn//使用yarn替代npm

# 3、新版power shell和旧版power shell
管理员打开是/windows/根目录，非管理员打开是/users/根目录。
runas /user:administrator cmd

# 4、gitbook
GitBook 使用教程](https://www.jianshu.com/p/421cc442f06c)

老版本地址：https://legacy.gitbook.com
新版本地址：https://www.gitbook.com（卡的要死，需要网速高）
注册账户：HanKin/1058198502@qq.com/3158

gitbook其实跟hexo一样，都是一个编译器，编译成静态网页，然后布置到github page上面。

## 4-1、安装
npm install gitbook-cli -g 
安装在了nodejs文件夹下，主要在node_modules下。
gitbook -v  安装是否成功（但我的看不见，成功了）

## 4-2、使用
gitbook init  初始化（会突然安装gitbook。。。。可能是升级）
gitbook serve 本地网页访问（注意不是server）
gitbook build 生成网页而不开启服务器

book.json是书籍配置文件，包括语言，作者介绍，赞助啊。

### 重点：基本操作
1、进入book的文件夹里
2、使用gitbook init查找 SUMMARY.md 文件中描述的目录和文件，如果没有则会将其创建。
3、gitbook serve或者gitbook build


## [解决GitBook不支持[TOC]生成的本页目录](https://www.jianshu.com/p/bf76487e1ce7)
## GitBook运行报错 - Error: ENOENT: no such file or directory, stat
PS：gitbook serve会报错，提示安装插件。gitbook install即可。

然后gitbook serve又报错，使用gitbook install检查了一下并没有啥需要安装，再gitbook serve就欧克了。

然鹅还是很有问题，还是百度好，百度过后发现是一个BUG。

颠覆三观，居然是一个Bug（Vesion：3.2.3）。

解决办法如下。

用户目录下找到以下文件。
C://用户/adminstrator/.gitbook\versions\3.2.3\lib\output\website\copyPluginAssets.js
```
Replace all
confirm: true
with
confirm: false
```

## 补充
他人不过不推荐用 gitbook，不能热编辑，页面生成时间超久，cli 官方很久没有维护了。
建议 vuepress 或者 hexo/hugo+theme。



# 5、上库：配置到GitHub或者coding



# 6、其他
## 5-1\Windows cmd窗口的切换目录命令无法切换盘符
发现为cd命令不会切换当前的盘符，只能在一个盘符内切换
使用cd /d d:就可以了。


# SyntaxError: D:\Gitbook\book.json: Unexpected token / in JSON at position 514
由于json文件里面注释写错。

关于这个报错Uncaught SyntaxError: Unexpected token < in JSON at position 0

字面上意义就是

解决方法：



正确的json格式：

{
"example": [
 { "firstName":"John" , "lastName":"Doe" },
 { "firstName":"Anna" , "lastName":"Smith" },
 { "firstName":"Peter" , "lastName":"Jones" }
 ]，/*注意逗号的分隔*/
"name":xiaoming,/*错误例子，xiaoming没有引号"xiaoming"*/
"age":13,//年龄 /*错误例子 注释应该为多行注释写法，这样的注释方法有误*/
"sister":[{name:"xiaofang"},{"name":"xiaofen"}]
}
嗯，这个基本是js里面才会报这个错，如果是PHP的话，也有可能

# 插件
GitBook 有 插件官网，默认带有 5 个插件，highlight、search、sharing、font-settings、livereload，如果要去除自带的插件， 可以在插件名称前面加 -，比如：

"plugins": [
    "-search"
]
如果要配置使用的插件可以在 book.json 文件中加入即可，比如我们添加 plugin-github，我们在 book.json 中加入配置如下即可：

{
    "plugins": [ "github" ],
    "pluginsConfig": {
        "github": {
            "url": "https://github.com/your/repo"
        }
    }
}
然后在终端输入 gitbook install ./ 即可。

如果要指定插件的版本可以使用 plugin@0.3.1，因为一些插件可能不会随着 GitBook 版本的升级而升级。

[Gitbook常用插件简介](https://blog.csdn.net/qq_37149933/article/details/64170653)
gitbook 入门教程之实用插件(新增3个插件)https://blog.csdn.net/weixin_38171180/article/details/89059127

pluginsConfig.edit-link.base is required
https://npm.taobao.org/package/gitbook-plugin-edit-link

http://zhibimo.com/
http://www.kancloud.cn/explore

GitHub对字母大小写铭感

# 超级BUG
解决Github Page无法更新，发很多邮件告诉我rejucts。https://www.jianshu.com/p/938ec18e572a
原因是：有个文档编码问题，使用了windows自带的记事本新建和编辑。

# 其他
这个根据软件跨借键不一样的，有些是Ctrl+shift+z,具体要去看软件快捷键设置。

[开源中国](https://www.oschina.net/)

KMSAuto Net - Windows 操作系统自动 KMS 激活程序。



Gitee （中文名：码云 ，原名 Git@OSC ）是开源中国推出的基于 Git 的代码托管服务。目前已经托管超过 500 万的项目。

Gitee 包括三个版本，分别是：社区版、企业版 和 高校版。


git、gitlab、github、gitee 到底都是什么鬼 原
 干干   干干 发布于 2018/04/24 17:19 字数 282 阅读 8578 收藏 2 点赞 1  评论 0
撸了今年阿里、头条和美团的面试，我有一个重要发现.......>>>  

git       是一种版本控制系统，是一个命令，是一种工具。
github  是一个基于git实现在线代码托管的仓库，向互联网开放，企业版要收钱。
gitlab   类似 github，一般用于在企业内搭建git私服，要自己搭环境。
gitee    即码云，是 oschina 免费给企业用的，不用自己搭建环境。
git-ce  是社区版，gitlab-ee是企业版，收费版。

GitHub、GitLab 不同点：
1、GitHub如果使用私有仓库，是需要付费的，GitLab可以在上面搭建私人的免费仓库。
2、GitLab让开发团队对他们的代码仓库拥有更多的控制，相对于GitHub，它有不少的特色：
    (1)允许免费设置仓库权限
    (2)允许用户选择分享一个project的部分代码
    (3)允许用户设置project的获取权限，进一步提升安全性
    (4)可以设置获取到团队整体的改进进度
    (5)通过innersourcing让不在权限范围内的人访问不到该资源


[Markdown编辑器(Atom,Markdownpad2,Typora)初比较](https://blog.csdn.net/lk274857347/article/details/70960219)

Markdown 是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）。
[初识Typora](https://blog.csdn.net/mingzhuo_126/article/details/79941450)

# atom （一款开源的代码编辑器） 
Atom 是github专门为程序员推出的一个跨平台文本编辑器。具有简洁和直观的图形用户界面，并有很多有趣的特点：支持CSS，HTML，JavaScript等网页编程语言。它支持宏，自动完成分屏功能，集成了文件管理器。
Atom是由GitHub开发的自由及开放源代码的文字与代码编辑器。

# MWeb
MWeb for Mac, iPad and iPhone
专业的 Markdown 写作、记笔记、静态博客生成软件


# 7、book.json文件

