[TOC]

# 1、写在前面
- 分支gitbook是项目原始文件
- 分支master是渲染的网页框架文件

因此在gitbook分支上操作。

会创建 README.md 和 SUMMARY.md 这两个文件，README.md 应该不陌生，就是说明文档,书籍的介绍写在这个文件里。而 SUMMARY.md 其实就是书的章节目录，书籍的目录结构在这里配置。



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
在Gitbook文件夹里使用：
>gitbook init
gitbook build or gitbook serve

然后将生成的_book文件夹里的动态替换到Github/GitBook/文件夹里：
>git add .
git commit -m"update"
git push 

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




