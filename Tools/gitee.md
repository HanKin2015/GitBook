# gitee搭建个人网站

## 1、简介
参考：https://blog.csdn.net/qq_42477843/article/details/107165026

Gitee （中文名：码云 ，原名 Git@OSC ）是开源中国推出的基于 Git 的代码托管服务。目前已经托管超过 500 万的项目。

Gitee 包括三个版本，分别是：社区版、企业版 和 高校版。

## 2、git、gitlab、github、gitee的区别
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

## 3、gitee开通gitee pages服务
Gitee Pages 服务 一个支持Jekyll、Hugo、Hexo静态网站的服务。
居然要个人身份证正反面以及手持身份证照片，太严格了。
但是后面不清楚为何又不需要验证了。

## 4、gitee搭建个人博客以及更换主题

### 4-1、新建仓库，此处一定要为gitee.io

### 4-2、利用gitee部署网站
服务-》gitee pages-》身份认证申请（身份证正面、反面、手持身份证照片）

### 4-3、安装环境
在windows上安装node.js
安装heox：https://hexo.io/zh-cn/docs/
npm install -g hexo-cli

坑点：node版本低，无法完成安装。
使用nvm命令更新node版本，结果更新到最新版本后却在windows7版本上面运行失败。
两个链接都需要参考：
https://www.mmzsblog.cn/articles/2021/12/18/1639798198040.html
https://blog.csdn.net/YukiGreen/article/details/131480726

nvm install 18.17.0
nvm use 18.17.0
```
D:\Github\Gitee\hexo>nvm ls

    18.17.0
    14.21.3
    14.15.3
    12.22.12
    12.16.2

D:\Github\Gitee\hexo>nvm current
No current version. Run 'nvm use x.x.x' to set a version.

D:\Github\Gitee\hexo>node -v
Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.
Setting the NODE_SKIP_PLATFORM_CHECK environment variable to 1 skips this
check, but Node.js might not execute correctly. Any issues encountered on
unsupported platforms will not be fixed.
```
增加环境变量，这个很重要，NODE_SKIP_PLATFORM_CHECK值为1。
增加系统变量，NODE_HOME值为C:\Users\Administrator\AppData\Roaming\nvm\v18.17.0;，然后添加到path值为%NODE_HOME%。
搞定解决。

### 4-4、本地创建hexo项目
mkdir hexo
cd hexo
hexo init

### 4-5、配置_config.yml文件
我的域名为http://hankin1994.gitee.io/gitee.io
我的仓库为https://gitee.com/hankin1994/gitee.io.git

### 4-6、本地调试
```
hexo clean
hexo g
hexo server
http://localhost:4000/gitee.io/
```

解决方案参考：https://github.com/nodemailer/nodemailer/issues/1410
```
问题现象：
D:\Github\Gitee\hexo>hexo clean
ERROR A system error occurred: uv_os_gethostname returned ENOSYS (function not implemented)
ERROR Local hexo loading failed in D:\Github\Gitee\hexo
ERROR Try running: 'rm -rf node_modules && npm install --force'

问题定位：
Administrator@WINedr-VDI0027 MINGW64 /d/Github/Gitee/hexo/node_modules
$ grep -R "os.hostname"
cuid/lib/fingerprint.js:    hostname = os.hostname(),

解决方案：
pid = pad(process.pid.toString(36), padding),
hostname = 'localhost',
length = hostname.length,
```

### 4-7、上传并重新部署网站
hexo d

### 4-8、更换主题
进入官网选择主题https://hexo.io/themes/

将其克隆到本地，去文件名-master，并复制到主题目录D:\Github\Gitee\hexo\themes下，然后在_comfig.yum中修改对应的主题名。





