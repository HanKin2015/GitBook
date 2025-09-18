# 我的学习笔记

## 1、前言
此笔记在2019年9月10日搭建，通过gitbook+github pages技术搭建，至今2025年9月10日刚好6年时间（真的巧）
原笔记部分文件备份路径：D:\interview\Storage\python\script\gitbook

网页地址：https://hankin2015.github.io/GitBook/

2025年9月10日以github pages、github actions和vitepress重新搭建，优势在于利用github actions自动化编译html网页流程，另外html文件不再上传至本仓库，由github服务器辅助缓存。

## 2、目录
- ACM
- Books
- C++
- Checklist
- Database
- Emtertainment
- Golang
- Linux
- ML
- Others
- Project
- Python
- QT
- Scripts
- Shell-vim
- StudyNotes
- todo
- Tools
- USBDevice
- Web
- Windows

## 3、日常维护操作
搭建心理路程：D:\interview\Machine_to_DeepingLearning\docs

### 3-1、git上库更新
git add .
git commit -m"20230220"
git push origin

### 3-2、使用脚本生成SUMMARY.md文件
python generate_summary.py
否则需要自己一个一个手动添加。

### 3-3、注意事项
- md文件不能以中文命名。
- md文件不能包含#符号
- gitbook build报错，book.json中的插件出现问题（当前发现summary插件出现问题，已过滤掉，自动生成SUMMARY.md文件插件）
- SUMMARY.md文件一定要是UTF-8格式
- md文件内容不能出现连续两个大括号\{\{ \}\}，否则gitbook编译不通过，必须要使用反斜杠转义

### 3-4、gitbook编译
在Gitbook文件夹里使用：
- gitbook init   （会根据生成的SUMMARY.md文件进行初始化检测操作，不存在的文件会自动创建）
- gitbook build . ../master     （创建时间会非常长3001.9s，可以通过打开生成目录查看html文件的生成过程）
- gitbook serve [--port xxxx]    # 编译后并在本地可使用地址查看，默认 4000 端口
- gitbook pdf ./ ./bookname.pdf
- gitbook epub ./ ./bookname.epub
- gitbook mobi ./ ./bookname.mobi

## 5、文件
book.json：文件配置
README.md：图书简介
SUMMARY.md：目录
GLOSSARY.md：要注释的术语列表
generate_summary.py：生成SUMMARY.md文件

# 日常维护
gitbook init（更新目录）

README.md 前言简介说明文档

SUMMARY.md 书的章节目录

gitbook serve（生成html）

_book 文件夹, 里面的内容即为生成的 html 文件

gitbook build（生成网页而不开启服务器）

book.json 存放配置信息

程序员变量命名网站：https://unbug.github.io/codelf/

## 20220124
发现一个不错的网站，免费下载各种学习的pdf资料：https://www.bookstack.cn/

linux命令搜索大全：https://wangchujiang.com/linux-command/

## VitePress搭建文档网站
https://www.cnblogs.com/Answer1215/p/18696254
https://blog.csdn.net/qq_44793507/article/details/142521250

## Actions报错
```
Branch "main" is not allowed to deploy to github-pages due to environment protection rules.
The deployment was rejected or didn't satisfy other protection rules.
```
参考：https://github.com/withastro/docs/issues/1376
在Settings-》Environments / Configure github-pages-》Deployment branches and tags将master修改为main即可。

## static.yml命令
yarn docs:build 是一个基于 Yarn 包管理器的脚本命令，通常用于构建项目的文档站点（生成可部署的静态文件）。

这个中的docs并不是文件夹的意思额，而是项目 package.json 中定义的一个自定义脚本名称，通常用于构建文档。
只不过写成这样则是告知vuepress build docs构建的目录是docs，因此需要修改的是 package.json 文件额。

## Element is missing end tag
```
build error:
[vite:vue] [plugin vite:vue] StudyNotes/mac.md (6:46): Element is missing end tag.
file: /home/runner/work/GitBook/GitBook/StudyNotes/mac.md:6:46
[vite:vue] [plugin vite:vue] StudyNotes/mac.md (6:46): Element is missing end tag.
file: /home/runner/work/GitBook/GitBook/StudyNotes/mac.md:6:46
```

然后查看mac.md文档，内容如下：
```
# mac学习

## 1、mac查看网卡连接的网线是百兆还是千兆
ifconfig即可查看到media: autoselect (1000baseT <full-duplex>)关键字。
```
猜测可能与文档中使用了\<full-duplex\>有关，尝试通过代码框或者转移字符解决。

发现这个在markdown文件中确实是违规写法，因为md文件支持html语法，因此直接这样写是有问题的。

发现：
```
<大小写字母->这样有问题，不局限于在标题栏
空<>，只含有数字，含有句号.，含有下划线_都是没有问题的
```

## [vitepress] 16 dead link(s) found.
发现md文件中的内容均有一个特点，就是非http协议的链接都会认为是本地链接，然后就会去寻找其文件，发现文件未找到则就会认为是无效链接，就会报错。


