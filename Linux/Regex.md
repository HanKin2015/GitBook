# 正则表达式 
正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为regex、regexp或RE），计算机科学的一个概念。正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本。
许多程序设计语言都支持利用正则表达式进行字符串操作。例如，在Perl中就内建了一个功能强大的正则表达式引擎。正则表达式这个概念最初是由Unix中的工具软件（例如sed和grep）普及开的。正则表达式通常缩写成“regex”，单数有regexp、regex，复数有regexps、regexes、regexen。

正则表达式（Regular Expression）通常被用来检索、替换那些符合某个模式(规则)的文本。目前多种程序开发语言均支持常规的正则表达式。作为一名系统、运维工程师，正则表达在日常工作中也比较常用。因此，掌握常用的正则表达式显得十分重要。

在目前的Linux系统中，通常搭配三剑客（grep、sed、awk）来使用。目前，正则表达式主要分为三类：基本正则表达式（Basic Regular Expression 又叫Basic RegEx 简称BREs）、扩展正则表达式（Extended Regular Expression 又叫Extended RegEx 简称EREs）、Perl的正则表达式（Perl Regular Expression 又叫Perl RegEx 简称PREs）。
通配符是由shell处理的, 它只会出现在 命令的“参数”里。当shell在“参数”中遇到了通配符时，shell会将其当作路径或文件名去在磁盘上搜寻可能的匹配：若符合要求的匹配存在，则进行代换(路径扩展)；否则就将该通配符作为一个普通字符传递给“命令”，然后再由命令进行处理。总之，通配符 实际上就是一种shell实现的路径扩展功能。在 通配符被处理后, shell会先完成该命令的重组，然后再继续处理重组后的命令，直至执行该命令。平时工作中我们对linux下的通配符和正则表达式模糊不清。

## 1、管道命令

中间的|是管道命令 是指ps命令与grep同时执行

grep全称是Global Regular Expression Print，表示全局正则表达式输出，它的使用权限是所有用户。

## 2、Perl正则表达式
发现prename和rename命令是同一个？？

C版本：rename 原字符串 新字符串 文件名
Perl版本：支持正则表达式
Ubuntu默认是Perl版本
CentOS默认是C版本，Perl版本是 prename命令，需安装


三种形式
匹配：m/<regexp>/  (可以省略m，直接写成/regexp/)
替换：s/<pattern>/<replacement>/
转化：tr/<pattern>/<replacement>/

## 3、通配符
```
touch file[1-3].txt		错误
touch file{1,2,3}.txt	正确
ll file[1-3].txt		正确
ll file{1,3}.txt		正确
```








