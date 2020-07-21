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

