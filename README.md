# 写在前面
- 分支gitbook是项目原始文件
- 分支master是渲染的网页框架文件

因此在gitbook分支上操作。


我的意中人是个盖世英雄，我知道有一天他会在一个万众瞩目的情况下出现，身披金甲圣衣，脚踏七色云彩来娶我，我猜中了前头，可是我猜不着这结局。



会创建 README.md 和 SUMMARY.md 这两个文件，README.md 应该不陌生，就是说明文档,书籍的介绍写在这个文件里。而 SUMMARY.md 其实就是书的章节目录，书籍的目录结构在这里配置。



# 目录

- ACM
- C++
- Linux
- Network
- Others
- Project
- Scripts
- Shell-vim
- Source
- StudyNotes
- Tools





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



在Gitbook文件夹里使用：
>gitbook init
gitbook build or gitbook serve

然后将生成的_book文件夹里的动态替换到Github/GitBook/文件夹里：
>git add .
git commit -m"update"
git push 

