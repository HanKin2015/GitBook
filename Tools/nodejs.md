[TOC]
# nodejs安装那些事儿

# 1、nodejs
常常对nvm和npm搞混淆。

nvm是管理nodejs的工具，安装nodejs可以从官网下载。但是最好是使用nvm进行安装。
npm是nodejs的命令工具。

# 2、gitbook
安装这个尽量使用nodejs的npm工具。

# 3、重点：三者的安装顺序
## 3-1、安装nvm，使用百度网盘下载nvm-setup.zip
- 链接：https://pan.baidu.com/s/1oWkZJQ40HlAnooftyKqiwQ 提取码：rlzt
- 安装好后在我的在C:\Users\Administrator\AppData\Roaming\nvm\目录下，可以加环境变量
- 在你安装的目录下找到settings.txt文件，打开后加上
```
root: C:\Users\Administrator\AppData\Roaming\nvm
path: C:\Program Files\nodejs
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

## 3-2、在里面安装nodejs
```
nvm	#查看版本和帮助
nvm list available	#查看当前可用的nodejs版本
nvm arch	#当前系统是多少位，并指定安装多少位的nodejs
nvm list	#查看已安装的nodejs
nvm use 版本号	#使用指定版本的nodejs
nvm install 版本号	#安装nodejs
如：nvm install 14.6.0
```

惊天bug：安装nodejs后提示已经安装成功，然而发现npm并没有安装成功，node_modles文件夹是空的。
解决方法：重装nvm不管用，安装其他版本nodejs不管用。最终选择安装最新nvm成功。
https://github.com/coreybutler/nvm-windows/releases


另外一个bug：
Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.
Setting the NODE_SKIP_PLATFORM_CHECK environment variable to 1 skips this
check, but Node.js might not execute correctly. Any issues encountered on
unsupported platforms will not be fixed.
高版本不支持，即当前版本，推荐安装最新的稳定版本，测试win7可用。

node -v
npm -v
nvm ls	#还能简写

## 3-3、然后使用npm安装gitbook
npm i -g gitbook

上面的命令已废弃，需要npm install -g gitbook-cli

否则运行gitbook报错：
You need to install "gitbook-cli" to have access to the gitbook command anywhere on your system.
If you've installed this package globally, you need to uninstall it.
>> Run "npm uninstall -g gitbook" then "npm install -g gitbook-cli"

安装后正常使用，如果使用老命令安装了一半也需要卸载干净才能安装gitbook-cli。

# 4、问题来了
已然放弃，gitbook安装成功后，然而由于版本太低。

使用gitbook build生成html文件的时候需要安装最新稳定版本3.2.3，但是无法连接Error: connect ETIMEDOUT 104.16.25.35:443
使用gitbook -V同样情况
使用gitbook update安装另外一个版本，然后报错TypeError: cb.apply is not a function（命名使用了关键字）
使用gitbook ls-remote查看所有可用版本
使用gitbook fetch 4.0.0-alpha.1安装相应的版本

当前本地版本：
gitbook2.3.2
gitbook ls-remote却显示latest是2.6.9
npm6.14.6
node12.18.3
nvm1.1.7


官网：http://gitbook.hushuang.me/setup.html




