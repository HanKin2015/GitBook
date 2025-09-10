# 搭建gitbook

## 1、多款工具比较
- gitbook
- git issue
- 豆瓣日记
- gist
- github page

上面就是一些写博客的工具和地方，还有hexo+GitHub page或者coding，我又发现了一个开源中国的码云。个人觉得不是一个前端爱好者就不要太折腾了，工具千千万，各有所爱。主要是现在没有太多的时间。

Heroku是一个支持多种编程语言的云平台。
在2010年被Salesforce.com收购。Heroku作为最开始的云平台之一，从2007年6月起开发，当时它仅支持Ruby，但后来增加了对Java、Node.js、Scala、Clojure、Python以及（未记录在正式文件上）PHP和Perl的支持。基础操作系统是Debian，在最新的堆栈则是基于Debian的Ubuntu。

## 2、gitbook简介
实际上，GitBook 是一个基于 Node.js 的命令行工具，支持 Markdown 和 AsciiDoc 两种语法格式，可以输出 HTML、PDF、eBook 等格式的电子书。所以我更喜欢把 GitBook 定义为文档格式转换工具。

执行 gitbook build 命令构建书籍，默认将生成的静态网站输出到 _book 目录。实际上，这一步也包含在 gitbook serve 里面，因为它们是 HTML，所以 GitBook 通过 Node.js 给你提供服务了。

要公开的项目放在github,把私有的放在gitee。coding,用是因为之前贪图提供的免费动态 Pages ，但是这个服务要在2018年7月截至了，并被腾讯收购了。

可以考虑国外免费的服务器。
[Heroku 教程：使用 Heroku 快速搭建站点](https://segmentfault.com/a/1190000014699439?utm_source=tag-newest)

安装使用需要nvm、npm、node命令。

## 3、nvm和npm区别
常常对nvm和npm搞混淆。

nvm是一个node的版本管理工具，可以简单操作node版本的切换、安装、查看。。。等等，与npm不同的是，npm是依赖包的管理工具。
nvm是管理nodejs的工具，安装nodejs可以从官网下载。但是最好是使用nvm进行安装。
npm是nodejs的命令工具，即安装nodejs后会自动安装npm命令，相当于python的pip命令。

### 4、nvm（Node Version Manager）
[nvm官网](https://github.com/nvm-sh/nvm)

在我们的日常开发中经常会遇到这种情况：手上有好几个项目，每个项目的需求不同，进而不同项目必须依赖不同版的 NodeJS 运行环境。如果没有一个合适的工具，这个问题将非常棘手。

nvm 应运而生，nvm 是 Mac 下的 node 管理工具，有点类似管理 Ruby 的 rvm，如果需要管理 Windows 下的 node，官方推荐使用 nvmw 或 nvm-windows。

其实最开始使用的是 n 命令，命令简洁到极致了，无奈总是安装不成功，往往下载一部分就报 curl 错误。 
然后又找到这个 nvm，配合淘宝源，简单快捷～

[nvm介绍及使用](https://www.jianshu.com/p/d0e0935b150a)

[使用 nvm 管理不同版本的 node 与 npm](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)

### 4-1、下载安装
感受：安装nodejs强烈推荐先安装nvm，然后再使用nvm命令安装nodejs。虽然自己用可能只会用到一个版本。

[nvm-windows官网下载](https://github.com/coreybutler/nvm-windows/releases)

官网下载真的慢，推荐走百度网盘，下载nvm-setup.zip。
[Windows下安装及使用NVM](https://blog.csdn.net/qq_32682137/article/details/82684898)

### 4-2、安装nvm，使用百度网盘下载nvm-setup.zip
https://blog.csdn.net/QWERTYQ16/article/details/124497532
linux官网下载：https://github.com/nvm-sh/nvm
windows官网下载：https://github.com/coreybutler/nvm-windows
- 链接：https://pan.baidu.com/s/1oWkZJQ40HlAnooftyKqiwQ 提取码：rlzt
- 安装好后在我的在C:\Users\Administrator\AppData\Roaming\nvm\目录下，可以加环境变量
- 在你安装的目录下找到settings.txt文件，打开后加上
```
root: C:\Users\Administrator\AppData\Roaming\nvm
path: C:\Program Files\nodejs
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

nvm ls                  // 看安装的所有node.js的版本
nvm list available      // 查显示可以安装的所有node.js的版本
nvm install 版本号      // 例如：nvm install 14.19.0
nvm use 版本号          // 切换到使用指定的nodejs版本
node -v                 // 检测是否切换完成，新开一个cmd
nvm uninstall <version> // 卸载制定的版本
nvm current             // 显示当前版本
nvm arch                // 当前系统是多少位，并指定安装多少位的nodejs
nvm root                // 查看nvm安装路径

nvm升级：下载nvm-update.exe即可，双击自动安装打印5分钟左右
```

## 5、nodejs

### 5-1、简介
[nodejs官网](https://nodejs.org/en/)
[nodejs中文官网](http://nodejs.cn/download/)

中文网站下载速度快的不是一星半点儿。

[Node.js中LTS和Current的有啥区别？](https://www.jianshu.com/p/014a14713dce)
[软件的Alpha、Beta、GM、OEM、LTS等版本的含义](https://blog.csdn.net/qq_36761831/article/details/83188138)

### 5-2、使用nvm命令安装nodejs
nvm install 12.16.2

惊天bug：安装nodejs后提示已经安装成功，然而发现npm并没有安装成功，node_modles文件夹是空的。
解决方法：重装nvm不管用，安装其他版本nodejs不管用。最终选择安装最新nvm成功。
https://github.com/coreybutler/nvm-windows/releases

另外一个bug：
Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.
Setting the NODE_SKIP_PLATFORM_CHECK environment variable to 1 skips this
check, but Node.js might not execute correctly. Any issues encountered on
unsupported platforms will not be fixed.
高版本不支持，即当前版本，推荐安装最新的稳定版本，测试win7可用。

查看是否安装成功：
```
C:\Users\Administrator>nvm -v
1.1.10

C:\Users\Administrator>npm -v
6.14.4

C:\Users\Administrator>node -v
v12.16.2

C:\Users\Administrator>nvm ls

  * 12.16.2 (Currently using 64-bit executable)
```

### 5-3、重点：修改settings.txt（主要是将npm镜像改为淘宝的镜像，可以提高下载速度。）
在你安装的目录下找到settings.txt文件，打开后加上 
node_mirror: https://npm.taobao.org/mirrors/node/ 
npm_mirror: https://npm.taobao.org/mirrors/npm/

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

### 5-4、node命令使用
两次ctrl+c退出或.exit。

### 5-5、问题1：没有npm命令，并且没有node_modules文件
总会遇到那么坑的坑。。。。。
难道是我的路径原因？？Program Files文件夹有空格？？
并且通过安装中提示有个temp文件夹，但是也没有，里面含有npm安装包。

### 5-6、问题2：卸载nodejs失败
Uninstalling node v10.16.3...Error removing node v10.16.3
Manually remove C:\Users\hj159\AppData\Roaming\nvm\v10.16.3.

坑啊：为啥老是会犯这种低级幼稚的错误，没有给cmd管理员权限。我固态只有两个磁盘分区，所以安装在了c盘，需要管理员权限才能进行读写操作。。。。

但是安装的时候npm还是安装失败了，但是下载相应的安装包在temp里面。好像启动了360还是不会下载npm安装包？？卸载了，但是下载后安装好像还是失败了，并且删除了temp文件夹，算了还是手动安装吧。

### 5-7、问题3：win7安装nodejs失败 显示only supported on Windows 8.1, Windows Server 2012 R2, or higher.
原因是因为nodejs版本太高了，v12.16.2以上版本不支持win7系统

nodejs 下载v12.16.2及之前的版本即可安装

### 5-8、手动下载单独安装npm
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

## 6、gitbook
GitBook 使用教程](https://www.jianshu.com/p/421cc442f06c)

老版本地址：https://legacy.gitbook.com
新版本地址：https://www.gitbook.com（卡的要死，需要网速高）
注册账户：HanKin/1058198502@qq.com/3158

gitbook其实跟hexo一样，都是一个编译器，编译成静态网页，然后布置到github page上面。

### 6-1、使用npm命令安装gitbook
npm i -g gitbook命令已废弃，需要npm install -g gitbook-cli
否则运行gitbook报错：
You need to install "gitbook-cli" to have access to the gitbook command anywhere on your system.
If you've installed this package globally, you need to uninstall it.
>> Run "npm uninstall -g gitbook" then "npm install -g gitbook-cli"

安装后正常使用，如果使用老命令安装了一半也需要卸载干净才能安装gitbook-cli。
```
C:\Users\Administrator>gitbook -V
CLI version: 2.3.2
GitBook version: 3.2.3
```
安装在了nodejs文件夹下，主要在node_modules下。

### 6-2、版本低问题解决
已然放弃，gitbook安装成功后，然而由于版本太低。

使用gitbook build生成html文件的时候需要安装最新稳定版本3.2.3，但是无法连接Error: connect ETIMEDOUT 104.16.25.35:443
使用gitbook -V同样情况
使用gitbook update安装另外一个版本，然后报错TypeError: cb.apply is not a function（命名使用了关键字）
使用gitbook ls-remote查看所有可用版本
使用gitbook fetch 4.0.0-alpha.1安装相应的版本

当前本地版本：
gitbook2.3.2
gitbook ls-remote却显示latest是2.6.9，现在已经20230220还是显示2.6.9，因此不能直接使用gitbook update命令
npm6.14.6
node12.18.3
nvm1.1.7

官网：https://www.gitbook.com/

```
updated npm "npm install npm -g"
downgraded react to; "react": "15.3.0"
cleared cache: npm cache clear
removed node_modules, rm -rf node_modules,
reinstalled node_modules, npm install.
```

### 6-3、使用
gitbook init  初始化（会突然安装gitbook。。。。可能是升级）
gitbook serve 本地网页访问（注意不是server）
gitbook build 生成网页而不开启服务器

book.json是书籍配置文件，包括语言，作者介绍，赞助啊。

### 6-4、重点：基本操作
1、进入book的文件夹里
2、使用gitbook init查找 SUMMARY.md 文件中描述的目录和文件，如果没有则会将其创建。
3、gitbook serve或者gitbook build

### 6-5、[解决GitBook不支持[TOC]生成的本页目录](https://www.jianshu.com/p/bf76487e1ce7)

### 6-6、GitBook运行报错 - Error: ENOENT: no such file or directory, stat
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

### 6-7补充
他人不推荐用gitbook，不能热编辑，页面生成时间超久，cli官方很久没有维护了。
建议 vuepress 或者 hexo/hugo+theme。

## 7、上库：配置到GitHub或者coding
具体实践操作见：D:\Github\GitBook\gitbook\README.md

## 8、SyntaxError: D:\Gitbook\book.json: Unexpected token / in JSON at position 514
原因：由于json文件里面注释写错。

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
嗯，这个基本是js里面才会报这个错，如果是PHP的话，也有可能。

## 9、插件
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

遇到一个问题，应该是随着md文件的增加，各种各样的标题不再规范，导致在使用summary插件生成SUMMARY.md文件时报错。
当前是在book.json文件中删除了summary插件。

参考：https://blog.csdn.net/xixihahalelehehe/article/details/125115239

## 10、超级BUG
解决Github Page无法更新，发很多邮件告诉我rejucts。https://www.jianshu.com/p/938ec18e572a
原因是：有个文档编码问题，使用了windows自带的记事本新建和编辑。

## 11、GitHub Pages 支持 3 种部署源
1. 方式一：直接使用仓库的「docs 目录」部署（无需 gh-pages 分支）
GitHub Pages 支持 3 种部署源，除了 gh-pages 分支，还可以直接指定仓库的 docs 目录（需在仓库设置中配置）：

开发者将 Markdown 文档源文件（如 GetStarted.md）直接放在仓库根目录的 docs 文件夹中；
在 GitHub 仓库的「Settings → Pages → Build and deployment」中，选择「Source」为「Deploy from a branch」，并指定「Branch」为 main（或 master）、「Folder」为 docs；
此时，GitHub 会自动将 main 分支下 docs 目录中的内容（若用静态站点生成器，可能是编译后输出到 docs 的 HTML）直接部署为 GitHub Pages，无需创建 gh-pages 分支。

这种情况下，你在仓库中自然看不到 gh-pages 分支，因为部署逻辑根本没用到它。

2. 方式二：使用「外部构建服务」部署（构建产物不提交到仓库分支）
部分项目会通过 GitHub Actions 或第三方工具（如 Netlify、Vercel）编译文档，但不将编译后的 HTML 提交到仓库的任何分支，而是直接将构建产物推送到 GitHub Pages 的 “后端存储”：

流程示例：开发者推送 Markdown 到 main 分支 → 触发 GitHub Actions 执行编译（生成 GetStarted.html 等文件） → Actions 调用 GitHub Pages 的 API，直接将编译产物上传到托管服务（跳过分支提交步骤）；
结果：仓库中只有 main 等源代码分支，没有 gh-pages 分支，因为构建产物从未作为分支代码提交。

这种方式更轻量化（避免仓库分支冗余），但会导致用户在仓库中看不到部署相关的分支。

3. 方式三：文档部署在「独立的 “文档仓库”」中（与主项目仓库分离）
async_simple 是主项目（代码仓库），其文档可能部署在一个单独的 GitHub 仓库中（而非主项目仓库内），例如：

主项目仓库：github.com/alibaba/async_simple（存储代码和 Markdown 文档源文件）；
文档部署仓库：github.com/alibaba/async_simple-docs（专门用于部署 GitHub Pages）；
逻辑：主项目的 GitHub Actions 编译文档后，将产物推送到 async_simple-docs 仓库的 gh-pages 分支（或 docs 目录），再通过该仓库的 Pages 服务对外提供 alibaba.github.io/async_simple 访问（可通过自定义路径配置实现）。

## 12、已验证无需上传编译好的html文件也可进行搭建网站
demo：https://hankin2015.github.io/Machine_to_DeepingLearning/
测试方法也在这个上面，gitbook已更新新的部署方式，删除了html源文件，只保留markdown文件。



