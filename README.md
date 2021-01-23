[TOC]

# 1、写在前面
- 分支gitbook是项目原始文件，并且会编译生成_book文件夹
- 分支master是渲染的网页框架文件

因此在gitbook分支上操作。

会创建 README.md 和 SUMMARY.md 这两个文件，README.md 应该不陌生，就是说明文档,书籍的介绍写在这个文件里。而 SUMMARY.md 其实就是书的章节目录，书籍的目录结构在这里配置。

网页地址：https://hankin2015.github.io/GitBook/
由于已经搭建好，使用gitbook build即可编译成功。

# 2、目录

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


# 3、日常维护操作
github上面默认在仓库根目录下调用index.html文件，是不是可以跳转到_book文件夹呢?

在Gitbook文件夹里使用：
>gitbook init
gitbook build 
gitbook serve   #编译后并在本地可使用地址查看

## 老式维护方式
然后将生成的_book文件夹里的动态替换到Github/GitBook/文件夹里：
>git add .
git commit -m"[UPDATE]20201230"
git push origin master

## 新式维护方式
https://blog.csdn.net/guoshenglong11/article/details/22306721/

删除分支gitbook，只保留master分支，然后通过自己单独编写的index.html文件来处理跳转问题。

但是出现一个很奇怪的问题，重新上库后整个目录没有任何变化。






# 4、给gitbook的目录添加数字 添加章节序号
默认情况下，GitBook的目录是没有序号的，若想为目录编号，

需要在GitBook项目的根目录下创建一个book.json文件，在其中输入如下内容：
```
{
    "pluginsConfig": {
        "theme-default": {
             "showLevel": true
        }
    }
}
```


# 5、文件
book.json：文件配置
README.md：图书简介
SUMMARY.md：目录
GLOSSARY.md：要注释的术语列表


# 6、gitbook build文章到非_book默认目录
在使用gitbook创建文章时。有时候我们不希望自己写的文章在_book目录下又不想手动去拷贝一遍，那么，我们可以在build指令后传入参数

参数一，书籍所在的目录，如果执行build指令时位于当前项目目录，输入./
参数二，输出的目录，相对于当前目录

推荐使用：gitbook build . ../master

# 7、在新电脑搭建维护环境
1. 安装nvm
[nvm-windows官网下载](https://github.com/coreybutler/nvm-windows/releases)
2. 配置镜像源
在你安装的目录下找到settings.txt文件，打开后加上 
node_mirror: https://npm.taobao.org/mirrors/node/ 
npm_mirror: https://npm.taobao.org/mirrors/npm/
3. 安装nodejs
nvm list available 显示可下载版本的部分列表
nvm install 版本号 安装指定的版本的nodejs
nvm use 版本号 使用指定版本的nodejs
注意: win7只能安装v12.16.2版本及更老的版本。
4. 安装gitbook
npm install gitbook-cli -g 
gitbook -V
5. 环境完成




